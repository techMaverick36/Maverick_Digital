/* Photo behind a navy header panel: a navy wash keeps the white text readable on the
   left, and lets the photo show through on the right. */
export const panelPhoto = (src, position = "center") => ({
	backgroundColor: "var(--navy)",
	backgroundImage: `linear-gradient(90deg, rgba(16,21,28,0.94) 0%, rgba(16,21,28,0.84) 50%, rgba(16,21,28,0.6) 100%), url('${src}')`,
	backgroundSize: "cover",
	backgroundPosition: position,
});
