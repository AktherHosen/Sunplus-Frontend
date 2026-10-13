import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Download,
  Upload,
  FileSpreadsheet,
  FileJson,
  Loader2,
  FileUp,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  MoreHorizontal,
} from "lucide-react";
import { toast } from "sonner";

interface ImportExportProps {
  title: string;
  exportEndpoint: string; // e.g. "/category/export"
  importMutation: (formData: FormData) => Promise<any>;
  onSuccess?: () => void;
  sampleHeaders?: string[];
  sampleData?: string;
}

export const ImportExportButtons: React.FC<ImportExportProps> = ({
  title,
  exportEndpoint,
  importMutation,
  onSuccess,
  sampleHeaders,
  sampleData,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [importing, setImporting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleExport = (format: "csv" | "json") => {
    const baseUrl = import.meta.env.VITE_API_URL;
    const separator = exportEndpoint.includes("?") ? "&" : "?";
    const downloadUrl = `${baseUrl}/api/v1${exportEndpoint}${separator}format=${format}`;

    const link = document.createElement("a");
    link.href = downloadUrl;
    link.setAttribute("download", `${title.toLowerCase()}.${format}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`Exporting ${title} as ${format.toUpperCase()}...`);
  };

  const handleDownloadSample = () => {
    if (!sampleData && !sampleHeaders) return;
    const content =
      sampleData || (sampleHeaders ? sampleHeaders.join(",") + "\r\n" : "");
    const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${title.toLowerCase()}_sample_template.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success("Sample template downloaded successfully!");
  };

  const handleFileSelect = (file: File) => {
    const validExtensions = [".csv", ".json"];
    const fileExt = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
    if (!validExtensions.includes(fileExt)) {
      toast.error("Please upload a valid .csv or .json file.");
      return;
    }
    setSelectedFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleUploadSubmit = async () => {
    if (!selectedFile) {
      toast.error("Please select a file to import.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setImporting(true);
      const res = await importMutation(formData);
      if (res?.data?.success) {
        toast.success(res.data.message || `${title} imported successfully!`);
        setIsModalOpen(false);
        setSelectedFile(null);
        onSuccess?.();
      } else if (res?.error) {
        const errorMsg =
          res.error?.data?.message || res.error?.message || `Failed to import ${title}`;
        toast.error(errorMsg);
      } else {
        toast.success(`${title} imported successfully!`);
        setIsModalOpen(false);
        setSelectedFile(null);
        onSuccess?.();
      }
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message || `Error importing ${title}`);
    } finally {
      setImporting(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <div className="flex items-center gap-1.5">
        {/* Dropdown Menu (rendered as MoreHorizontal "..." button) */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-9 w-9 p-0 text-muted-foreground hover:text-foreground"
              title="More actions"
            >
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel className="text-xs text-muted-foreground">Manage {title}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                setSelectedFile(null);
                setIsModalOpen(true);
              }}
              className="cursor-pointer gap-2"
            >
              <Upload className="w-4 h-4 text-primary" />
              <span>Import {title}</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => handleExport("csv")}
              className="cursor-pointer gap-2"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              <span>Export as CSV</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleExport("json")}
              className="cursor-pointer gap-2"
            >
              <FileJson className="w-4 h-4 text-amber-600" />
              <span>Export as JSON</span>
            </DropdownMenuItem>
            {(sampleHeaders || sampleData) && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleDownloadSample}
                  className="cursor-pointer gap-2 text-xs text-muted-foreground"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Sample</span>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Import Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-lg w-[95vw] sm:w-full">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg font-bold">
              <FileUp className="w-5 h-5 text-primary" />
              Import {title}
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Upload a CSV or JSON file containing your {title.toLowerCase()} data. Download our sample template below to see the required structure.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {/* Sample Download Banner */}
            {(sampleHeaders || sampleData) && (
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 rounded-lg border border-primary/20 bg-primary/5 text-xs">
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-primary shrink-0" />
                  <div>
                    <span className="font-semibold text-foreground">Need a sample file?</span>
                    <p className="text-muted-foreground text-[11px]">
                      Download our pre-filled template with examples.
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownloadSample}
                  className="h-8 gap-1.5 text-xs shrink-0 bg-background hover:bg-muted border-primary/30 text-primary font-medium"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Sample CSV
                </Button>
              </div>
            )}

            {/* Drag & Drop File Upload Area */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2.5 ${
                isDragging
                  ? "border-primary bg-primary/10 scale-[1.01]"
                  : selectedFile
                  ? "border-emerald-500/50 bg-emerald-50/30 dark:bg-emerald-950/20"
                  : "border-border hover:border-primary/50 hover:bg-muted/30"
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => {
                  if (e.target.files?.[0]) handleFileSelect(e.target.files[0]);
                }}
                accept=".csv,.json"
                className="hidden"
              />

              {selectedFile ? (
                <>
                  <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-600">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">{selectedFile.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(selectedFile.size / 1024).toFixed(1)} KB &bull; Click or drop another to replace
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-foreground">
                      Click to browse or drag & drop file here
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Supports .csv and .json files
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Quick Helper Tips */}
            <div className="p-3 bg-muted/40 rounded-lg text-xs space-y-1 text-muted-foreground">
              <div className="flex items-center gap-1.5 font-medium text-foreground">
                <HelpCircle className="w-3.5 h-3.5 text-primary" />
                <span>Import Guidelines:</span>
              </div>
              <ul className="list-disc list-inside space-y-0.5 text-[11px] pl-1">
                <li>Simple format with just name, category, and basic info (no images required).</li>
                <li>Existing items with matching names or slugs will be updated automatically.</li>
                <li>You can add product images later directly through the edit button.</li>
              </ul>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0 pt-2 border-t">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setIsModalOpen(false);
                setSelectedFile(null);
              }}
              disabled={importing}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleUploadSubmit}
              disabled={!selectedFile || importing}
              className="gap-2"
            >
              {importing ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Importing...
                </>
              ) : (
                <>
                  <Upload className="w-3.5 h-3.5" />
                  Confirm & Import
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
