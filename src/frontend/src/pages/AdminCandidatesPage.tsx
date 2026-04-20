import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowLeft,
  Edit2,
  Plus,
  Trash2,
  Upload,
  User,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { ExternalBlob } from "../backend";
import GhanaButton from "../components/GhanaButton";
import PageHeader from "../components/PageHeader";
import {
  useAddCandidate,
  useDeleteCandidate,
  useGetCandidates,
  useUpdateCandidate,
} from "../hooks/useQueries";
import type { CandidateInfo } from "../types";

// ── Photo picker ──────────────────────────────────────────────────────────────

function PhotoPicker({
  photoUrl,
  onFile,
  label,
}: {
  photoUrl: string | null;
  onFile: (file: File) => void;
  label: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>
      <div className="flex items-center gap-3">
        <div className="w-16 h-16 rounded-xl border border-border overflow-hidden bg-muted flex items-center justify-center flex-shrink-0">
          {photoUrl ? (
            <img
              src={photoUrl}
              alt="Preview"
              className="w-full h-full object-cover object-top"
            />
          ) : (
            <User className="w-8 h-8 text-muted-foreground" />
          )}
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={() => inputRef.current?.click()}
          data-ocid="candidate.upload_button"
        >
          <Upload className="w-4 h-4" />
          {photoUrl ? "Change Photo" : "Upload Photo"}
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          aria-label="Upload candidate photo"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onFile(f);
          }}
        />
      </div>
    </div>
  );
}

// ── Add candidate dialog ──────────────────────────────────────────────────────

function AddCandidateDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [party, setParty] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const addCandidate = useAddCandidate();

  const handleFile = (file: File) => {
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !party.trim() || !photoFile) {
      toast.error("Please fill in all fields and upload a photo.");
      return;
    }
    try {
      const bytes = new Uint8Array(await photoFile.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) => {
        setUploadProgress(pct);
      });
      await addCandidate.mutateAsync({
        name: name.trim(),
        party: party.trim(),
        photo: blob,
      });
      toast.success(`${name} added successfully!`);
      setName("");
      setParty("");
      setPhotoFile(null);
      setPhotoPreview(null);
      setUploadProgress(0);
      onClose();
    } catch {
      toast.error("Failed to add candidate. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md" data-ocid="add_candidate.dialog">
        <DialogHeader>
          <DialogTitle className="font-display">Add New Candidate</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5 pt-2">
          <div className="space-y-1.5">
            <Label htmlFor="add-name">Full Name</Label>
            <Input
              id="add-name"
              placeholder="e.g. John Mahama"
              value={name}
              onChange={(e) => setName(e.target.value)}
              data-ocid="add_candidate.name_input"
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="add-party">Political Party</Label>
            <Input
              id="add-party"
              placeholder="e.g. National Democratic Congress"
              value={party}
              onChange={(e) => setParty(e.target.value)}
              data-ocid="add_candidate.party_input"
              required
            />
          </div>
          <PhotoPicker
            photoUrl={photoPreview}
            onFile={handleFile}
            label="Candidate Photo *"
          />
          {addCandidate.isPending && uploadProgress > 0 && (
            <div className="space-y-1" data-ocid="add_candidate.loading_state">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Uploading photo…</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              data-ocid="add_candidate.cancel_button"
            >
              Cancel
            </Button>
            <GhanaButton
              type="submit"
              ghanaVariant="accent"
              disabled={addCandidate.isPending}
              data-ocid="add_candidate.submit_button"
            >
              {addCandidate.isPending ? "Saving…" : "Add Candidate"}
            </GhanaButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ── Edit candidate dialog ─────────────────────────────────────────────────────

function EditCandidateDialog({
  candidate,
  onClose,
}: {
  candidate: CandidateInfo | null;
  onClose: () => void;
}) {
  const [name, setName] = useState(candidate?.name ?? "");
  const [party, setParty] = useState(candidate?.party ?? "");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const updateCandidate = useUpdateCandidate();

  const currentPhotoUrl =
    photoPreview ?? (candidate ? candidate.photo.getDirectURL() : null);

  const handleFile = (file: File) => {
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidate || !name.trim() || !party.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      let photo = candidate.photo;
      if (photoFile) {
        const bytes = new Uint8Array(await photoFile.arrayBuffer());
        photo = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) => {
          setUploadProgress(pct);
        });
      }
      await updateCandidate.mutateAsync({
        id: candidate.id,
        name: name.trim(),
        party: party.trim(),
        photo,
      });
      toast.success(`${name} updated successfully!`);
      onClose();
    } catch {
      toast.error("Failed to update candidate. Please try again.");
    }
  };

  return (
    <Dialog open={!!candidate} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md" data-ocid="edit_candidate.dialog">
        <DialogHeader>
          <DialogTitle className="font-display">Edit Candidate</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5 pt-2">
          <div className="space-y-1.5">
            <Label htmlFor="edit-name">Full Name</Label>
            <Input
              id="edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              data-ocid="edit_candidate.name_input"
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="edit-party">Political Party</Label>
            <Input
              id="edit-party"
              value={party}
              onChange={(e) => setParty(e.target.value)}
              data-ocid="edit_candidate.party_input"
              required
            />
          </div>
          <PhotoPicker
            photoUrl={currentPhotoUrl}
            onFile={handleFile}
            label="Candidate Photo"
          />
          {updateCandidate.isPending && uploadProgress > 0 && (
            <div className="space-y-1" data-ocid="edit_candidate.loading_state">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Uploading photo…</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              data-ocid="edit_candidate.cancel_button"
            >
              Cancel
            </Button>
            <GhanaButton
              type="submit"
              ghanaVariant="secondary"
              disabled={updateCandidate.isPending}
              data-ocid="edit_candidate.submit_button"
            >
              {updateCandidate.isPending ? "Saving…" : "Save Changes"}
            </GhanaButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ── Delete confirmation dialog ────────────────────────────────────────────────

function DeleteConfirmDialog({
  candidate,
  onClose,
}: {
  candidate: CandidateInfo | null;
  onClose: () => void;
}) {
  const deleteCandidate = useDeleteCandidate();

  const handleDelete = async () => {
    if (!candidate) return;
    try {
      await deleteCandidate.mutateAsync(candidate.id);
      toast.success(`${candidate.name} removed.`);
      onClose();
    } catch {
      toast.error("Failed to delete candidate. Please try again.");
    }
  };

  return (
    <Dialog open={!!candidate} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        className="sm:max-w-sm"
        data-ocid="delete_candidate.dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display text-primary">
            Remove Candidate?
          </DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          Are you sure you want to remove{" "}
          <strong className="text-foreground">{candidate?.name}</strong>? This
          action cannot be undone.
        </p>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            data-ocid="delete_candidate.cancel_button"
          >
            Cancel
          </Button>
          <GhanaButton
            ghanaVariant="primary"
            onClick={handleDelete}
            disabled={deleteCandidate.isPending}
            data-ocid="delete_candidate.confirm_button"
          >
            {deleteCandidate.isPending ? "Removing…" : "Yes, Remove"}
          </GhanaButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ── Candidate row card ────────────────────────────────────────────────────────

function CandidateRow({
  candidate,
  index,
  onEdit,
  onDelete,
}: {
  candidate: CandidateInfo;
  index: number;
  onEdit: (c: CandidateInfo) => void;
  onDelete: (c: CandidateInfo) => void;
}) {
  const photoUrl = candidate.photo.getDirectURL();

  return (
    <div
      className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:shadow-sm transition-smooth"
      data-ocid={`candidates.item.${index + 1}`}
    >
      <div className="w-12 h-12 rounded-xl overflow-hidden bg-muted border border-border flex-shrink-0">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={candidate.name}
            className="w-full h-full object-cover object-top"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <User className="w-6 h-6 text-muted-foreground" />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-foreground truncate">
          {candidate.name}
        </p>
        <p className="text-sm text-muted-foreground truncate">
          {candidate.party}
        </p>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <Button
          variant="ghost"
          size="icon"
          className="w-9 h-9 text-muted-foreground hover:text-foreground hover:bg-muted"
          onClick={() => onEdit(candidate)}
          aria-label={`Edit ${candidate.name}`}
          data-ocid={`candidates.edit_button.${index + 1}`}
        >
          <Edit2 className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="w-9 h-9 text-primary/70 hover:text-primary hover:bg-primary/10"
          onClick={() => onDelete(candidate)}
          aria-label={`Delete ${candidate.name}`}
          data-ocid={`candidates.delete_button.${index + 1}`}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function AdminCandidatesPage() {
  const { data: candidates, isLoading, isError } = useGetCandidates();
  const [addOpen, setAddOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<CandidateInfo | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<CandidateInfo | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        variant="admin"
        title="Manage Candidates"
        subtitle={
          candidates
            ? `${candidates.length} candidate${candidates.length !== 1 ? "s" : ""} registered`
            : "Loading…"
        }
        action={
          <div className="flex items-center gap-3">
            <Link to="/admin" data-ocid="candidates.back_link">
              <GhanaButton ghanaVariant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Dashboard
              </GhanaButton>
            </Link>
            <GhanaButton
              ghanaVariant="accent"
              size="sm"
              onClick={() => setAddOpen(true)}
              data-ocid="candidates.add_button"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Candidate
            </GhanaButton>
          </div>
        }
      />

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {isLoading ? (
          <div className="space-y-3" data-ocid="candidates.loading_state">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-20 rounded-xl" />
            ))}
          </div>
        ) : isError ? (
          <div
            className="flex flex-col items-center gap-3 py-16 text-muted-foreground"
            data-ocid="candidates.error_state"
          >
            <AlertCircle className="w-10 h-10 text-primary/60" />
            <p className="font-medium">Failed to load candidates</p>
          </div>
        ) : candidates && candidates.length === 0 ? (
          <div
            className="flex flex-col items-center gap-4 py-16 text-center"
            data-ocid="candidates.empty_state"
          >
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
              <User className="w-8 h-8 text-muted-foreground" />
            </div>
            <div>
              <p className="font-semibold text-foreground">No candidates yet</p>
              <p className="text-sm text-muted-foreground mt-1">
                Add the first candidate to get started
              </p>
            </div>
            <GhanaButton
              ghanaVariant="accent"
              onClick={() => setAddOpen(true)}
              data-ocid="candidates.empty_add_button"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Candidate
            </GhanaButton>
          </div>
        ) : (
          <div className="space-y-3" data-ocid="candidates.list">
            {candidates?.map((c, i) => (
              <CandidateRow
                key={String(c.id)}
                candidate={c}
                index={i}
                onEdit={setEditTarget}
                onDelete={setDeleteTarget}
              />
            ))}
          </div>
        )}
      </div>

      <AddCandidateDialog open={addOpen} onClose={() => setAddOpen(false)} />
      <EditCandidateDialog
        candidate={editTarget}
        onClose={() => setEditTarget(null)}
      />
      <DeleteConfirmDialog
        candidate={deleteTarget}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
}
