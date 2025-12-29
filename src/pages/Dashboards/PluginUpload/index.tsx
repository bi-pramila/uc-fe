import React from "react";
import BreadCrumb from "Common/BreadCrumb";
import Dropzone from "react-dropzone";
import { UploadCloud } from "lucide-react";
import JSZip from "jszip";

const extractZipToSrcPlugins = async (zip: JSZip, rootFolderName: string) => {
  const g: any = globalThis as any;
  const fs = g.require?.("fs");
  const path = g.require?.("path");

  if (!fs || !path) {
    console.warn("fs/path not available; cannot write to src/plugins/ from this environment.");
    return;
  }

  const baseDir = path.resolve(process.cwd(), "src", "plugins");
  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
  }

  const entries: any[] = Object.values((zip as any).files);

  for (const entry of entries) {
    const filePath: string = entry.name;
    const targetPath = path.join(baseDir, filePath);

    if (entry.dir) {
      if (!fs.existsSync(targetPath)) {
        fs.mkdirSync(targetPath, { recursive: true });
      }
    } else {
      const dirName = path.dirname(targetPath);
      if (!fs.existsSync(dirName)) {
        fs.mkdirSync(dirName, { recursive: true });
      }
      const content = await entry.async("nodebuffer");
      fs.writeFileSync(targetPath, content);
    }
  }
};

const PluginUpload = () => {
  const [selectedFiles, setSelectedFiles] = React.useState<any[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const formatBytes = (bytes: any, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const isZipFile = (file: File) => {
    const name = file.name.toLowerCase();
    const type = file.type.toLowerCase();
    if (name.endsWith(".zip")) return true;
    if (type.includes("zip")) return true;
    return false;
  };

  const handleAcceptedFiles = (files: File[]) => {
    setError(null);

    if (!files || files.length === 0) {
      setSelectedFiles([]);
      return;
    }

    const file = files[0];

    if (files.length > 1) {
      setError("Please upload only one file.");
    }

    if (!isZipFile(file)) {
      setSelectedFiles([]);
      setError("Only .zip files are allowed.");
      return;
    }

    const enhancedFile: any = Object.assign(file, {
      preview: URL.createObjectURL(file),
      formattedSize: formatBytes(file.size),
    });

    setSelectedFiles([enhancedFile]);
  };

  const handleSubmit = async () => {
    try {
      setError(null);

      if (!selectedFiles.length) {
        setError("Please upload a zip file before submitting.");
        return;
      }

      const file: File = selectedFiles[0];
      if (!isZipFile(file)) {
        setError("Only .zip files are allowed.");
        return;
      }

      setIsSubmitting(true);

      const arrayBuffer = await file.arrayBuffer();
      const zip = await JSZip.loadAsync(arrayBuffer);

      const paths = Object.keys(zip.files);
      if (!paths.length) {
        setError("The zip file is empty.");
        setIsSubmitting(false);
        return;
      }

      const folderNames = new Set<string>();
      paths.forEach((path) => {
        const parts = path.split("/");
        if (parts[0]) {
          folderNames.add(parts[0]);
        }
      });

      let rootFolderName = Array.from(folderNames)[0];
      if (!rootFolderName) {
        rootFolderName = file.name.replace(/\.zip$/i, "");
      }

      let configPath: string | null = null;
      if (zip.file(`${rootFolderName}/config.json`)) {
        configPath = `${rootFolderName}/config.json`;
      } else if (zip.file("config.json")) {
        configPath = "config.json";
      } else {
        const candidate = paths.find((p) => p.toLowerCase().endsWith("config.json"));
        if (candidate) configPath = candidate;
      }

      if (!configPath) {
        setError("config.json not found in the zip.");
        setIsSubmitting(false);
        return;
      }

      const configFile = zip.file(configPath);
      if (!configFile) {
        setError("config.json not found in the zip.");
        setIsSubmitting(false);
        return;
      }

      const configContent = await configFile.async("string");
      let configJson: any;
      try {
        configJson = JSON.parse(configContent);
      } catch {
        setError("config.json is not valid JSON.");
        setIsSubmitting(false);
        return;
      }

      if (!configJson || typeof configJson !== "object") {
        configJson = {};
      }

      configJson.directory_name = rootFolderName;

      zip.file(configPath, JSON.stringify(configJson, null, 2));

      await extractZipToSrcPlugins(zip, rootFolderName);

      setSelectedFiles([]);
      setIsSubmitting(false);
      alert("Plugin extracted and placed under src/plugins/.");
    } catch (e: any) {
      setError(e?.message || "Something went wrong while processing the zip.");
      setIsSubmitting(false);
    }
  };

  return (
    <React.Fragment>
      <div className="container-fluid group-data-[content=boxed]:max-w-boxed mx-auto">
        <BreadCrumb title="Plugin Upload" pageTitle="Dashboard" />

        <div className="card">
          <div className="card-body">
            <h6 className="mb-4 text-15">Plugin Upload</h6>

            <div className="mb-3">
              <label
                htmlFor="inputLabel"
                className="inline-block mb-2 text-base font-medium"
              >
                Text <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="inputTitle"
                className="form-input border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-fecustom-500 disabled:bg-slate-100 dark:disabled:bg-zinc-600 disabled:border-slate-300 dark:disabled:border-zinc-500 dark:disabled:text-zinc-200 disabled:text-slate-500 dark:text-zinc-100 dark:bg-zinc-700 dark:focus:border-fecustom-800 placeholder:text-slate-400 dark:placeholder:text-zinc-200"
                required
              />
            </div>

            <div className="flex items-center justify-center border rounded-md cursor-pointer bg-slate-100 dropzone border-slate-200 dark:bg-zinc-600 dark:border-zinc-500 dz-clickable">
              <Dropzone
                multiple={false}
                maxFiles={1}
                accept={{
                  "application/zip": [".zip"],
                  "application/x-zip-compressed": [".zip"],
                }}
                onDrop={(acceptedFiles: any) => {
                  handleAcceptedFiles(acceptedFiles);
                }}
              >
                {({ getRootProps, getInputProps }: any) => (
                  <div
                    className="w-full py-5 text-lg text-center dz-message needsclick"
                    {...getRootProps()}
                  >
                    <input {...getInputProps()} />
                    <div className="mb-3">
                      <UploadCloud className="block size-12 mx-auto text-slate-500 fill-slate-200 dark:text-zinc-200 dark:fill-zinc-500" />
                    </div>

                    <h5 className="mb-0 font-normal text-slate-500 text-15">
                      Drag and drop your zip file or <a href="#!">browse</a> your
                      files
                    </h5>
                  </div>
                )}
              </Dropzone>
            </div>

            {error && (
              <p className="mt-2 text-sm text-red-500">
                {error}
              </p>
            )}

            <ul className="mb-0" id="dropzone-preview">
              {(selectedFiles || []).map((f: any, i: any) => {
                return (
                  <li className="mt-2" id="dropzone-preview-list" key={i + "-file"}>
                    <div className="border rounded border-slate-200 dark:border-zinc-500">
                      <div className="flex p-2">
                        <div className="shrink-0 me-3">
                          <div className="p-2 rounded-md size-14 bg-slate-100 dark:bg-zinc-600">
                            <img
                              data-dz-thumbnail
                              className="block w-full h-full rounded-md"
                              src={f.preview}
                              alt={f.name}
                            />
                          </div>
                        </div>
                        <div className="grow">
                          <div className="pt-1">
                            <h5 className="mb-1 text-15" data-dz-name>
                              {f.name}
                            </h5>
                            <p
                              className="mb-0 text-slate-500 dark:text-zinc-200"
                              data-dz-size
                            >
                              {f.formattedSize}
                            </p>
                          </div>
                        </div>
                        <div className="shrink-0 ms-3">
                          <button
                            data-dz-remove
                            className="px-2 py-1.5 text-xs text-white bg-red-500 border-red-500 btn hover:text-white hover:bg-red-600 hover:border-red-600 focus:text-white focus:bg-red-600 focus:border-red-600 focus:ring focus:ring-red-100 active:text-white active:bg-red-600 active:border-red-600 active:ring active:ring-red-100 dark:ring-fecustom-400/20"
                            onClick={() => {
                              const newImages = [...selectedFiles];
                              newImages.splice(i, 1);
                              setSelectedFiles(newImages);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="mt-2 text-white btn bg-fecustom-500 border-fecustom-500 hover:text-white hover:bg-fecustom-600 hover:border-fecustom-600 focus:text-white focus:bg-fecustom-600 focus:border-fecustom-600 focus:ring focus:ring-fecustom-100 active:text-white active:bg-fecustom-600 active:border-fecustom-600 active:ring active:ring-fecustom-100 dark:ring-fecustom-400/20 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PluginUpload;
