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
import { Download, Upload, FileSpreadsheet, FileJson, Loader2 } from "lucide-react";
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
  const [importing, setImporting] = useState(false);

  const handleExport = (format: "csv" | "json") => {
    const baseUrl = import.meta.env.VITE_API_URL;
    const separator = exportEndpoint.includes("?") ? "&" : "?";
    const downloadUrl = `${baseUrl}/api/v1${exportEndpoint}${separator}format=${format}`;
    
    // Trigger download
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
    const content = sampleData || (sampleHeaders ? sampleHeaders.join(",") + "\r\n" : "");
    const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${title.toLowerCase()}_sample_template.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.info("Sample template downloaded");
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validExtensions = [".csv", ".json"];
    const fileExt = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
    if (!validExtensions.includes(fileExt)) {
      toast.error("Please select a valid CSV or JSON file.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setImporting(true);
      const res = await importMutation(formData);
      if (res?.data?.success) {
        toast.success(res.data.message || `${title} imported successfully!`);
      } else if (res?.error) {
        toast.error(res.error?.data?.message || `Failed to import ${title}`);
      } else {
        toast.success(`${title} imported successfully!`);
      }
      onSuccess?.();
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message || `Error importing ${title}`);
    } finally {
      setImporting(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex items-center gap-1.5">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".csv,.json"
        className="hidden"
      />

      {/* Export Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-9 gap-1.5 text-xs sm:text-sm font-medium">
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuLabel>Export {title}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleExport("csv")} className="cursor-pointer gap-2">
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Export as CSV</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleExport("json")} className="cursor-pointer gap-2">
            <FileJson className="w-4 h-4 text-amber-600" />
            <span>Export as JSON</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Import Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="h-9 gap-1.5 text-xs sm:text-sm font-medium"
            disabled={importing}
          >
            {importing ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Upload className="w-3.5 h-3.5" />
            )}
            <span>{importing ? "Importing..." : "Import"}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-52">
          <DropdownMenuLabel>Import {title}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => fileInputRef.current?.click()}
            className="cursor-pointer gap-2"
          >
            <Upload className="w-4 h-4 text-primary" />
            <span>Upload CSV or JSON</span>
          </DropdownMenuItem>
          {(sampleHeaders || sampleData) && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleDownloadSample}
                className="cursor-pointer gap-2 text-muted-foreground text-xs"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Download Sample Template</span>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
