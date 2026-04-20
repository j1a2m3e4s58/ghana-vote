import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, L as Link, G as GhanaButton, B as Button, b as ue } from "./index-Bkav72OT.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogFooter } from "./dialog-CxWdhJEb.js";
import { L as Label, I as Input } from "./label-RiMzNpXj.js";
import { P as PageHeader, S as Skeleton, C as CircleAlert } from "./PageHeader-Dpi7hpVO.js";
import { c as useGetCandidates, h as useAddCandidate, i as useUpdateCandidate, j as useDeleteCandidate, k as ExternalBlob } from "./useQueries-C7TDwMkU.js";
import { U as User } from "./user-DCrQr0VU.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ]
];
const Pen = createLucideIcon("pen", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
];
const Upload = createLucideIcon("upload", __iconNode);
function PhotoPicker({
  photoUrl,
  onFile,
  label
}) {
  const inputRef = reactExports.useRef(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-xl border border-border overflow-hidden bg-muted flex items-center justify-center flex-shrink-0", children: photoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: photoUrl,
          alt: "Preview",
          className: "w-full h-full object-cover object-top"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-8 h-8 text-muted-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          className: "gap-2",
          onClick: () => {
            var _a;
            return (_a = inputRef.current) == null ? void 0 : _a.click();
          },
          "data-ocid": "candidate.upload_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4" }),
            photoUrl ? "Change Photo" : "Upload Photo"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          ref: inputRef,
          type: "file",
          accept: "image/*",
          className: "hidden",
          "aria-label": "Upload candidate photo",
          onChange: (e) => {
            var _a;
            const f = (_a = e.target.files) == null ? void 0 : _a[0];
            if (f) onFile(f);
          }
        }
      )
    ] })
  ] });
}
function AddCandidateDialog({
  open,
  onClose
}) {
  const [name, setName] = reactExports.useState("");
  const [party, setParty] = reactExports.useState("");
  const [photoFile, setPhotoFile] = reactExports.useState(null);
  const [photoPreview, setPhotoPreview] = reactExports.useState(null);
  const [uploadProgress, setUploadProgress] = reactExports.useState(0);
  const addCandidate = useAddCandidate();
  const handleFile = (file) => {
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !party.trim() || !photoFile) {
      ue.error("Please fill in all fields and upload a photo.");
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
        photo: blob
      });
      ue.success(`${name} added successfully!`);
      setName("");
      setParty("");
      setPhotoFile(null);
      setPhotoPreview(null);
      setUploadProgress(0);
      onClose();
    } catch {
      ue.error("Failed to add candidate. Please try again.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-md", "data-ocid": "add_candidate.dialog", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "Add New Candidate" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-5 pt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "add-name", children: "Full Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "add-name",
            placeholder: "e.g. John Mahama",
            value: name,
            onChange: (e) => setName(e.target.value),
            "data-ocid": "add_candidate.name_input",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "add-party", children: "Political Party" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "add-party",
            placeholder: "e.g. National Democratic Congress",
            value: party,
            onChange: (e) => setParty(e.target.value),
            "data-ocid": "add_candidate.party_input",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        PhotoPicker,
        {
          photoUrl: photoPreview,
          onFile: handleFile,
          label: "Candidate Photo *"
        }
      ),
      addCandidate.isPending && uploadProgress > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", "data-ocid": "add_candidate.loading_state", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Uploading photo…" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            uploadProgress,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-full bg-primary rounded-full transition-all duration-300",
            style: { width: `${uploadProgress}%` }
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: onClose,
            "data-ocid": "add_candidate.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          GhanaButton,
          {
            type: "submit",
            ghanaVariant: "accent",
            disabled: addCandidate.isPending,
            "data-ocid": "add_candidate.submit_button",
            children: addCandidate.isPending ? "Saving…" : "Add Candidate"
          }
        )
      ] })
    ] })
  ] }) });
}
function EditCandidateDialog({
  candidate,
  onClose
}) {
  const [name, setName] = reactExports.useState((candidate == null ? void 0 : candidate.name) ?? "");
  const [party, setParty] = reactExports.useState((candidate == null ? void 0 : candidate.party) ?? "");
  const [photoFile, setPhotoFile] = reactExports.useState(null);
  const [photoPreview, setPhotoPreview] = reactExports.useState(null);
  const [uploadProgress, setUploadProgress] = reactExports.useState(0);
  const updateCandidate = useUpdateCandidate();
  const currentPhotoUrl = photoPreview ?? (candidate ? candidate.photo.getDirectURL() : null);
  const handleFile = (file) => {
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!candidate || !name.trim() || !party.trim()) {
      ue.error("Please fill in all fields.");
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
        photo
      });
      ue.success(`${name} updated successfully!`);
      onClose();
    } catch {
      ue.error("Failed to update candidate. Please try again.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!candidate, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-md", "data-ocid": "edit_candidate.dialog", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "Edit Candidate" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-5 pt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-name", children: "Full Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "edit-name",
            value: name,
            onChange: (e) => setName(e.target.value),
            "data-ocid": "edit_candidate.name_input",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-party", children: "Political Party" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "edit-party",
            value: party,
            onChange: (e) => setParty(e.target.value),
            "data-ocid": "edit_candidate.party_input",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        PhotoPicker,
        {
          photoUrl: currentPhotoUrl,
          onFile: handleFile,
          label: "Candidate Photo"
        }
      ),
      updateCandidate.isPending && uploadProgress > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", "data-ocid": "edit_candidate.loading_state", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Uploading photo…" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            uploadProgress,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-full bg-primary rounded-full transition-all duration-300",
            style: { width: `${uploadProgress}%` }
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: onClose,
            "data-ocid": "edit_candidate.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          GhanaButton,
          {
            type: "submit",
            ghanaVariant: "secondary",
            disabled: updateCandidate.isPending,
            "data-ocid": "edit_candidate.submit_button",
            children: updateCandidate.isPending ? "Saving…" : "Save Changes"
          }
        )
      ] })
    ] })
  ] }) });
}
function DeleteConfirmDialog({
  candidate,
  onClose
}) {
  const deleteCandidate = useDeleteCandidate();
  const handleDelete = async () => {
    if (!candidate) return;
    try {
      await deleteCandidate.mutateAsync(candidate.id);
      ue.success(`${candidate.name} removed.`);
      onClose();
    } catch {
      ue.error("Failed to delete candidate. Please try again.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!candidate, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "sm:max-w-sm",
      "data-ocid": "delete_candidate.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-primary", children: "Remove Candidate?" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          "Are you sure you want to remove",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: candidate == null ? void 0 : candidate.name }),
          "? This action cannot be undone."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: onClose,
              "data-ocid": "delete_candidate.cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            GhanaButton,
            {
              ghanaVariant: "primary",
              onClick: handleDelete,
              disabled: deleteCandidate.isPending,
              "data-ocid": "delete_candidate.confirm_button",
              children: deleteCandidate.isPending ? "Removing…" : "Yes, Remove"
            }
          )
        ] })
      ]
    }
  ) });
}
function CandidateRow({
  candidate,
  index,
  onEdit,
  onDelete
}) {
  const photoUrl = candidate.photo.getDirectURL();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:shadow-sm transition-smooth",
      "data-ocid": `candidates.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl overflow-hidden bg-muted border border-border flex-shrink-0", children: photoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: photoUrl,
            alt: candidate.name,
            className: "w-full h-full object-cover object-top"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-6 h-6 text-muted-foreground" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground truncate", children: candidate.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground truncate", children: candidate.party })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              className: "w-9 h-9 text-muted-foreground hover:text-foreground hover:bg-muted",
              onClick: () => onEdit(candidate),
              "aria-label": `Edit ${candidate.name}`,
              "data-ocid": `candidates.edit_button.${index + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              className: "w-9 h-9 text-primary/70 hover:text-primary hover:bg-primary/10",
              onClick: () => onDelete(candidate),
              "aria-label": `Delete ${candidate.name}`,
              "data-ocid": `candidates.delete_button.${index + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
            }
          )
        ] })
      ]
    }
  );
}
function AdminCandidatesPage() {
  const { data: candidates, isLoading, isError } = useGetCandidates();
  const [addOpen, setAddOpen] = reactExports.useState(false);
  const [editTarget, setEditTarget] = reactExports.useState(null);
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        variant: "admin",
        title: "Manage Candidates",
        subtitle: candidates ? `${candidates.length} candidate${candidates.length !== 1 ? "s" : ""} registered` : "Loading…",
        action: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin", "data-ocid": "candidates.back_link", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GhanaButton, { ghanaVariant: "outline", size: "sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 mr-2" }),
            "Dashboard"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            GhanaButton,
            {
              ghanaVariant: "accent",
              size: "sm",
              onClick: () => setAddOpen(true),
              "data-ocid": "candidates.add_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-2" }),
                "Add Candidate"
              ]
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-8 max-w-3xl", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "candidates.loading_state", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-xl" }, i)) }) : isError ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center gap-3 py-16 text-muted-foreground",
        "data-ocid": "candidates.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-10 h-10 text-primary/60" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "Failed to load candidates" })
        ]
      }
    ) : candidates && candidates.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center gap-4 py-16 text-center",
        "data-ocid": "candidates.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-8 h-8 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "No candidates yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Add the first candidate to get started" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            GhanaButton,
            {
              ghanaVariant: "accent",
              onClick: () => setAddOpen(true),
              "data-ocid": "candidates.empty_add_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-2" }),
                "Add Candidate"
              ]
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "candidates.list", children: candidates == null ? void 0 : candidates.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      CandidateRow,
      {
        candidate: c,
        index: i,
        onEdit: setEditTarget,
        onDelete: setDeleteTarget
      },
      String(c.id)
    )) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AddCandidateDialog, { open: addOpen, onClose: () => setAddOpen(false) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      EditCandidateDialog,
      {
        candidate: editTarget,
        onClose: () => setEditTarget(null)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DeleteConfirmDialog,
      {
        candidate: deleteTarget,
        onClose: () => setDeleteTarget(null)
      }
    )
  ] });
}
export {
  AdminCandidatesPage as default
};
