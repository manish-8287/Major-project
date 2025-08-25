import React, { useState } from "react";
import { Upload, FileText, Image as ImageIcon, Loader2 } from "lucide-react";

const FileUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus("⚠️ No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.status === 200) {
        setUploadStatus("✅ File uploaded successfully!");
        setUploadedFileUrl(`http://localhost:3000${data.fileUrl}`);
      } else {
        setUploadStatus("❌ Upload failed.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus("⚠️ Error uploading file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
          <Upload className="w-5 h-5 text-blue-500" /> Upload a File
        </h2>

        {/* File input styled */}
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition">
          <div className="flex flex-col items-center justify-center">
            <Upload className="w-6 h-6 text-gray-500" />
            <p className="text-sm text-gray-500">Click to select or drag a file here</p>
          </div>
          <input type="file" onChange={handleFileChange} className="hidden" />
        </label>

        {selectedFile && (
          <div className="flex items-center gap-3 p-2 bg-gray-100 rounded-lg mt-3">
            {selectedFile.type.startsWith("image/") ? (
              <ImageIcon className="w-6 h-6 text-blue-500" />
            ) : (
              <FileText className="w-6 h-6 text-gray-500" />
            )}
            <span className="text-sm text-gray-700 truncate">{selectedFile.name}</span>
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={!selectedFile || loading}
          className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Uploading...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4" /> Upload
            </>
          )}
        </button>

        {uploadStatus && (
          <p className="text-sm text-center font-medium text-gray-700 mt-3">{uploadStatus}</p>
        )}

        {uploadedFileUrl && (
          <div className="mt-4">
            <p className="text-sm text-gray-600">Preview:</p>
            {selectedFile?.type.startsWith("image/") ? (
              <img
                src={uploadedFileUrl}
                alt="Uploaded"
                className="w-full rounded-lg border mt-2"
              />
            ) : (
              <a
                href={uploadedFileUrl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline mt-2 inline-block"
              >
                View Uploaded File
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
