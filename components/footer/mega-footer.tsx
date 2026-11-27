import styles from "./mega-footer.module.css";

export default function MegaFooter() {
  const columns = [
    {
      title: "Product",
      links: [
        { label: "Features", href: "#" },
        { label: "Pricing", href: "#" },
        { label: "Security", href: "#" },
        { label: "Team", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Jobs", href: "#" },
        { label: "Press", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", href: "#" },
        { label: "API Reference", href: "#" },
        { label: "Community", href: "#" },
        { label: "Support", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy", href: "#" },
        { label: "Terms", href: "#" },
        { label: "Cookies", href: "#" },
        { label: "Contact", href: "#" },
      ],
    },
  ];

  return (
    <footer className={styles.footer} id="mega-footer">
      <div className={styles.container}>
        <div className={styles.grid}>
          {columns.map((column) => (
            <div key={column.title} className={styles.column}>
              <h3 className={styles.columnTitle}>{column.title}</h3>
              <ul className={styles.columnLinks}>
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className={styles.divider} />
        <div className={styles.copyright}>
          <p>&copy; 2024 Mannuel Ferreira. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
