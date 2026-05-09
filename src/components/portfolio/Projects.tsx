import { useState } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, Pencil, Trash2, Plus, Save, X } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { SectionHeading } from "./SectionHeading";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";
import fallback1 from "@/assets/project-1.jpg";
import fallback2 from "@/assets/project-2.jpg";
import fallback3 from "@/assets/project-3.jpg";

const fallbacks = [fallback1, fallback2, fallback3];

type Project = {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  tech: string[];
  github_url: string | null;
  demo_url: string | null;
  sort_order: number;
};

type Draft = Omit<Project, "id"> & { id?: string };

const empty: Draft = {
  title: "",
  description: "",
  image_url: "",
  tech: [],
  github_url: "",
  demo_url: "",
  sort_order: 0,
};

export function Projects() {
  const { isAdmin } = useAuth();
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Draft | null>(null);

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data as Project[];
    },
  });

  const save = useMutation({
    mutationFn: async (d: Draft) => {
      const payload = {
        title: d.title,
        description: d.description,
        image_url: d.image_url || null,
        tech: d.tech,
        github_url: d.github_url || null,
        demo_url: d.demo_url || null,
        sort_order: d.sort_order,
      };
      if (d.id) {
        const { error } = await supabase.from("projects").update(payload).eq("id", d.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("projects").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["projects"] });
      setEditing(null);
      toast.success("Project saved");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project deleted");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <section id="projects" className="relative py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Projects"
          title="Things I've built"
          description="A selection of personal and academic projects that reflect how I think and ship."
        />

        {isAdmin && (
          <div className="mb-8 flex justify-end">
            <button
              onClick={() => setEditing({ ...empty, sort_order: projects.length + 1 })}
              className="inline-flex items-center gap-2 rounded-full bg-primary-gradient px-4 py-2 text-sm font-medium text-primary-foreground glow-ring"
            >
              <Plus className="size-4" /> Add Project
            </button>
          </div>
        )}

        {isLoading ? (
          <p className="text-center text-muted-foreground">Loading…</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                className="group glass rounded-3xl overflow-hidden hover-lift relative"
              >
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    src={p.image_url || fallbacks[i % fallbacks.length]}
                    alt={p.title}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-90" />
                  {isAdmin && (
                    <div className="absolute top-3 right-3 flex gap-2">
                      <button
                        onClick={() => setEditing(p)}
                        className="grid place-items-center size-9 rounded-full glass-strong hover:scale-110 transition"
                        aria-label="Edit"
                      >
                        <Pencil className="size-4" />
                      </button>
                      <button
                        onClick={() => confirm(`Delete "${p.title}"?`) && remove.mutate(p.id)}
                        className="grid place-items-center size-9 rounded-full glass-strong hover:scale-110 hover:text-red-400 transition"
                        aria-label="Delete"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2.5 py-1 rounded-full border border-border text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex gap-2">
                    {p.github_url && (
                      <a
                        href={p.github_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs border border-border hover:bg-secondary transition-colors"
                      >
                        <Github className="size-3.5" /> Code
                      </a>
                    )}
                    {p.demo_url && (
                      <a
                        href={p.demo_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs bg-primary-gradient text-primary-foreground hover:scale-[1.04] transition-transform"
                      >
                        <ExternalLink className="size-3.5" /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>

      {editing && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-background/80 backdrop-blur-sm p-4"
          onClick={() => setEditing(null)}
        >
          <div
            className="glass-strong rounded-3xl p-6 w-full max-w-lg max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {editing.id ? "Edit project" : "New project"}
              </h3>
              <button onClick={() => setEditing(null)} aria-label="Close" title="Close">
                <X className="size-5" />
              </button>
            </div>
            <div className="space-y-3">
              {[
                ["Title", "title"],
                ["Description", "description"],
                ["Image URL", "image_url"],
                ["GitHub URL", "github_url"],
                ["Demo URL", "demo_url"],
              ].map(([label, key]) => (
                <div key={key}>
                  <label className="text-xs text-muted-foreground">{label}</label>
                  {key === "description" ? (
                    <textarea
                      rows={3}
                      value={(editing[key as keyof Draft] as string) ?? ""}
                      onChange={(e) => setEditing({ ...editing, [key]: e.target.value } as Draft)}
                      placeholder={`Enter ${label.toLowerCase()}...`}
                      className="w-full mt-1 rounded-xl bg-background/40 border border-border px-3 py-2 outline-none focus:border-primary text-sm"
                    />
                  ) : (
                    <input
                      value={(editing[key as keyof Draft] as string) ?? ""}
                      onChange={(e) => setEditing({ ...editing, [key]: e.target.value } as Draft)}
                      placeholder={`Enter ${label.toLowerCase()}...`}
                      className="w-full mt-1 rounded-xl bg-background/40 border border-border px-3 py-2 outline-none focus:border-primary text-sm"
                    />
                  )}
                </div>
              ))}
              <div>
                <label className="text-xs text-muted-foreground">Tech (comma separated)</label>
                <input
                  value={editing.tech.join(", ")}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      tech: e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean),
                    })
                  }
                  placeholder="e.g., Python, React, Node.js"
                  className="w-full mt-1 rounded-xl bg-background/40 border border-border px-3 py-2 outline-none focus:border-primary text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Sort order</label>
                <input
                  type="number"
                  value={editing.sort_order}
                  onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })}
                  placeholder="0"
                  className="w-full mt-1 rounded-xl bg-background/40 border border-border px-3 py-2 outline-none focus:border-primary text-sm"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setEditing(null)}
                className="rounded-full px-4 py-2 text-sm border border-border hover:bg-secondary"
              >
                Cancel
              </button>
              <button
                onClick={() => save.mutate(editing)}
                disabled={save.isPending || !editing.title}
                className="inline-flex items-center gap-2 rounded-full bg-primary-gradient px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60"
              >
                <Save className="size-4" /> {save.isPending ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
