import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Save, Plus, Trash2, ExternalLink } from "lucide-react";
import { usePortfolio } from "../../context/PortfolioContext";

const MotionDiv = motion.div;

export default function FooterManagerPanel() {
  const { portfolioData, updateFooter } = usePortfolio();
  const footer = portfolioData.footer || {};
  const [tagline, setTagline] = useState(footer.tagline || "");
  const [adminLink, setAdminLink] = useState(footer.adminLink || "/admin/login");
  const [adminLabel, setAdminLabel] = useState(footer.adminLabel || "Admin Login");
  const [socialLinks, setSocialLinks] = useState(
    footer.socialLinks || [
      { platform: "Email", url: "mailto:kenyaniemmanuel44@gmail.com", icon: "Mail" },
      { platform: "GitHub", url: "https://github.com/manuijaev", icon: "Github" },
      { platform: "LinkedIn", url: "https://www.linkedin.com/in/emmanuel-kenyani-48b763383", icon: "Linkedin" },
    ]
  );
  const [newPlatform, setNewPlatform] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newIcon, setNewIcon] = useState("ExternalLink");

  useEffect(() => {
    setTagline(footer.tagline || "");
    setAdminLink(footer.adminLink || "/admin/login");
    setAdminLabel(footer.adminLabel || "Admin Login");
    setSocialLinks(
      footer.socialLinks || [
        { platform: "Email", url: "mailto:kenyaniemmanuel44@gmail.com", icon: "Mail" },
        { platform: "GitHub", url: "https://github.com/manuijaev", icon: "Github" },
        { platform: "LinkedIn", url: "https://www.linkedin.com/in/emmanuel-kenyani-48b763383", icon: "Linkedin" },
      ]
    );
  }, [footer]);

  const addSocialLink = () => {
    const platform = newPlatform.trim();
    const url = newUrl.trim();
    if (!platform || !url) return;
    setSocialLinks([...socialLinks, { platform, url, icon: newIcon || "ExternalLink" }]);
    setNewPlatform("");
    setNewUrl("");
    setNewIcon("ExternalLink");
  };

  const removeSocialLink = (index) => {
    setSocialLinks(socialLinks.filter((_, idx) => idx !== index));
  };

  const handleSave = () => {
    updateFooter({
      tagline: tagline.trim(),
      adminLink: adminLink.trim(),
      adminLabel: adminLabel.trim(),
      socialLinks: socialLinks.map((link) => ({
        platform: String(link.platform || "").trim(),
        url: String(link.url || "").trim(),
        icon: String(link.icon || "ExternalLink").trim(),
      })),
    });
  };

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-white/90 dark:bg-slate-900/85 p-5 shadow-lg backdrop-blur"
    >
      <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Footer Manager</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Tagline</label>
          <textarea
            rows="3"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            className="w-full rounded-xl border border-slate-300/90 dark:border-slate-600 px-3.5 py-2.5 bg-white/90 dark:bg-slate-950/60 text-slate-900 dark:text-slate-100 outline-none transition focus:ring-2 focus:ring-blue-500/60 focus:border-blue-500"
            placeholder="Footer tagline text"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Admin Link URL</label>
            <input
              value={adminLink}
              onChange={(e) => setAdminLink(e.target.value)}
              className="w-full rounded-xl border border-slate-300/90 dark:border-slate-600 px-3.5 py-2.5 bg-white/90 dark:bg-slate-950/60 text-slate-900 dark:text-slate-100 outline-none transition focus:ring-2 focus:ring-blue-500/60 focus:border-blue-500"
              placeholder="/admin/login"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Admin Link Label</label>
            <input
              value={adminLabel}
              onChange={(e) => setAdminLabel(e.target.value)}
              className="w-full rounded-xl border border-slate-300/90 dark:border-slate-600 px-3.5 py-2.5 bg-white/90 dark:bg-slate-950/60 text-slate-900 dark:text-slate-100 outline-none transition focus:ring-2 focus:ring-blue-500/60 focus:border-blue-500"
              placeholder="Admin Login"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Social Links</label>
          <div className="space-y-2 max-h-64 overflow-auto pr-1">
            {socialLinks.map((link, index) => (
              <div key={`${link.platform}-${index}`} className="grid grid-cols-[1fr_1fr_auto_auto] gap-2 items-center">
                <input
                  value={link.platform}
                  onChange={(e) =>
                    setSocialLinks(socialLinks.map((item, idx) => (idx === index ? { ...item, platform: e.target.value } : item)))
                  }
                  className="rounded-lg border border-slate-300/90 dark:border-slate-600 px-3 py-2 bg-white/90 dark:bg-slate-950/60 text-slate-900 dark:text-slate-100 outline-none transition focus:ring-2 focus:ring-blue-500/60 focus:border-blue-500"
                  placeholder="Platform"
                />
                <input
                  value={link.url}
                  onChange={(e) =>
                    setSocialLinks(socialLinks.map((item, idx) => (idx === index ? { ...item, url: e.target.value } : item)))
                  }
                  className="rounded-lg border border-slate-300/90 dark:border-slate-600 px-3 py-2 bg-white/90 dark:bg-slate-950/60 text-slate-900 dark:text-slate-100 outline-none transition focus:ring-2 focus:ring-blue-500/60 focus:border-blue-500"
                  placeholder="URL"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.open(link.url, "_blank")}
                  className="rounded-lg bg-slate-200 dark:bg-slate-700 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600"
                >
                  <ExternalLink size={14} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => removeSocialLink(index)}
                  className="rounded-lg bg-rose-600 px-3 py-2 text-xs font-semibold text-white hover:bg-rose-700"
                >
                  <Trash2 size={14} />
                </motion.button>
              </div>
            ))}
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-[1fr_1fr_auto_auto]">
            <input
              value={newPlatform}
              onChange={(e) => setNewPlatform(e.target.value)}
              placeholder="Platform name"
              className="rounded-lg border border-slate-300/90 dark:border-slate-600 px-3 py-2 bg-white/90 dark:bg-slate-950/60 text-slate-900 dark:text-slate-100 outline-none transition focus:ring-2 focus:ring-blue-500/60 focus:border-blue-500"
            />
            <input
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="URL"
              className="rounded-lg border border-slate-300/90 dark:border-slate-600 px-3 py-2 bg-white/90 dark:bg-slate-950/60 text-slate-900 dark:text-slate-100 outline-none transition focus:ring-2 focus:ring-blue-500/60 focus:border-blue-500"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={addSocialLink}
              className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700"
            >
              <Plus size={14} />
            </motion.button>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSave}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <Save size={16} />
          Save Footer
        </motion.button>
      </div>
    </MotionDiv>
  );
}
