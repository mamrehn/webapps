/* App catalog of the overview page — edit here, index.html renders it.

   id        stable key, also used by extract_efforts.py (APP_SOURCES)
   audience  'student' and/or 'teacher'
   maturity  1–5, decimals allowed (4.5 = level 4, halfway to 5)
   compact   true for deliberately small tools: listed as „Kleine Werkzeuge“
   url       omit for apps that are not published yet
   install   direct install link (userscript), only where it works on its
             own – not for mebis-Sync, which also needs its Python part
   installNote  what installing needs, shown under „Details“
   summary   one short sentence shown on the tile; omit if the
             description is already that short
   description  the full text, shown under „Details“
   The tile's pictogram lives in pictograms.js under the same id.     */

window.MATURITY_LEVELS = [
  { level: 1, name: 'Prototyp', text: 'Erste Alpha: Die Idee ist umgesetzt, vieles ist noch unfertig und kann sich ändern.' },
  { level: 2, name: 'Demo', text: 'Funktionsfähige Demo: Die Kernfunktionen laufen, breit getestet ist sie noch nicht.' },
  { level: 3, name: 'Erprobt', text: 'Von mehreren Personen getestet, Rückmeldungen sind eingearbeitet.' },
  { level: 4, name: 'Im Einsatz', text: 'Wird regelmäßig im Unterricht oder im Schulalltag genutzt.' },
  { level: 5, name: 'Ausgereift', text: 'Stabil und vielfach bewährt, kaum offene Punkte.' }
];

window.APPS = [
  {
    id: 'pib3',
    title: 'piB3 Roboter Steuerung',
    kind: 'Python-Bibliothek',
    audience: ['student', 'teacher'],
    maturity: 4.5,
    url: 'https://mamrehn.github.io/pib3/',
    summary: 'Steuert den humanoiden Roboter pib mit Python – den echten und seinen digitalen Zwilling in der Webots-Simulation.',
    description: 'Python-Bibliothek für den humanoiden Roboter pib, einen Torso mit Armen und KI-Kamera im Kopf. Sie steuert die Gelenke, berechnet die inverse Kinematik und wechselt nahtlos zwischen dem echten Roboter und seinem digitalen Zwilling in der Webots-Physiksimulation. Dazu kommen RGB- und KI-Kamera, Mikrofon und Lautsprecher (Sprache und Text-to-Speech).'
  },
  {
    id: 'flashcards',
    title: 'Flashcards',
    kind: 'Web-App',
    audience: ['student'],
    maturity: 5,
    url: 'https://mamrehn.github.io/flashcards/',
    summary: 'Lernkarten nutzen und selbst erstellen, um Unterrichtsinhalte zu üben.',
    description: 'Ein intuitives Tool zum Erlernen von Unterrichtsinhalten. Hilft Lernenden, Lernkarten zu verwenden und zu erstellen.'
  },
  {
    id: 'git',
    title: 'Git Lernumgebung',
    kind: 'Web-App',
    audience: ['student', 'teacher'],
    maturity: 1.8,
    url: 'https://mamrehn.github.io/b3_git_webapp/',
    summary: 'Git Schritt für Schritt lernen, angeleitet und risikofrei in einer Online-Konsole.',
    description: 'Interaktive Git Lernumgebung als Web-App. Risikofreies angeleitetes Lernerlebnis in der Online Konsole.'
  },
  {
    id: 'styleguide',
    title: 'B3 Style-Guide',
    kind: 'Designsystem',
    audience: ['teacher'],
    maturity: 2.8,
    url: 'https://mamrehn.github.io/b3_it_styleguide_for_webapps/',
    summary: 'Designsystem mit Komponenten, Farben und Regeln für einheitliche Web-Apps.',
    description: 'Gemeinsame Vorlage für Lehrkräfte der B3 Berufsschule für Web-App Layout-Elemente. Einheitliches Design-System mit Komponenten, Farben und Best Practices.'
  },
  {
    id: 'netzwerkdose',
    title: 'Interaktive 3D Netzwerkverkabelung',
    kind: '3D-Lernspiel',
    audience: ['student'],
    maturity: 4.0,
    url: 'https://mamrehn.github.io/b3D/ethernet_cabeling/',
    summary: '3D-Lernspiel: Eine Netzwerkdose nach T568A richtig auflegen, mit gestuften Hilfen.',
    description: 'Interaktives 3D-Lernspiel zur korrekten Belegung einer Netzwerkdose nach dem T568A-Standard. Gestufte Hilfen unterstützen beim Erlernen der LSA-Klemmen Verkabelung.'
  },
  {
    id: 'zeugnis',
    title: 'Zeugnisbemerkungen',
    kind: 'Web-App',
    audience: ['student', 'teacher'],
    maturity: 2.8,
    url: 'https://mamrehn.github.io/zeugnis/',
    summary: 'Hilft beim Erstellen und Verwalten von Zeugnisbemerkungen.',
    description: 'Unterstützt bei der Erstellung und Verwaltung von Zeugnisinformationen. Erleichtert den Prozess für Lehrkräfte und Lernende.'
  },
  {
    id: 'vm',
    title: 'B3 Virtuelle Maschine Download',
    kind: 'Virtuelle Maschine',
    audience: ['student'],
    maturity: 5,
    compact: true,
    url: 'https://mamrehn.github.io/b3_vm_download/',
    summary: 'Fertig eingerichtete Lubuntu-VM mit allen Programmen für den Unterricht.',
    description: 'Vorinstallierte Lubuntu Linux VM mit allen notwendigen Anwendungen (VS Code mit Extensions, git, docker, webserver, mariadb, ROS, webots, ...).'
  },
  {
    id: 'dashboard',
    title: 'Dashboard für Prüfungen',
    kind: 'Web-App',
    audience: ['teacher'],
    maturity: 5,
    url: 'https://mamrehn.github.io/dashboard/',
    summary: 'Zentraler Überblick für Lehrkräfte während einer Prüfung.',
    description: 'Ein zentrales Dashboard für Lehrkräfte zum Überblick für die Schülerinnen und Schüler während einer Prüfung.'
  },
  {
    id: 'mebis-sync',
    title: 'mebis-Sync',
    kind: 'Python-Werkzeuge und Userscript',
    audience: ['teacher'],
    maturity: 4.0,
    url: 'https://github.com/B3-AWP/b3_enhance_mebis',
    summary: 'Kursinhalte als Markdown in git pflegen und mit mebis in beide Richtungen abgleichen.',
    description: 'Kursinhalte liegen versioniert in git in einem lokalen Kursordner, unterrichtet wird auf der ByCS-Lernplattform (Moodle 5.x) – und dort manchmal auch schnell nachgebessert. Du schreibst Markdown, die Werkzeuge erzeugen daraus HTML-Fragmente, und ein Userscript im Browser hält beide Seiten synchron: Lokale Änderungen landen in den Aktivitäten, Änderungen in mebis fließen zurück ins Markdown, und wo sich beides geändert hat, fragt es nach – mit einem Diff vor jedem Schreiben.'
  },
  {
    id: 'mebis-quiz-pdf',
    title: 'mebis-Quiz → PDF',
    kind: 'Python-Werkzeug',
    audience: ['teacher'],
    maturity: 4.0,
    url: 'https://github.com/B3-AWP/print_mebis_quiz_results',
    summary: 'Macht aus mebis-Quizabgaben druckfertige PDFs mit Note nach IHK-Schlüssel.',
    description: 'Wandelt einen mebis-ZIP-Export mit Quiz-Abgaben (Abgabe*.html) in druckfertige PDFs um: zwei A4-Seiten pro Querformat-Blatt, Notenkasten nach IHK-Schlüssel und Punkteliste zum Einfügen in Excel.'
  },
  {
    id: 'webuntis-lehrstoff',
    title: 'WebUntis Lehrstoff-Helfer',
    kind: 'Userscript',
    audience: ['teacher'],
    maturity: 3,
    url: 'https://github.com/B3-AWP/b3_enhance_webuntis',
    install: 'https://github.com/B3-AWP/b3_enhance_webuntis/raw/refs/heads/main/webuntis-lehrstoff-helper.user.js',
    installNote: 'Mit Violentmonkey oder Tampermonkey, angemeldet bei GitHub (privates Repository).',
    summary: 'Lehrstoff, Abwesenheiten und Erinnerungen in WebUntis schneller erledigen.',
    description: 'Jahresüberblick über alle deine Kurse, (halb-)automatisches Ausfüllen der Lehrstoff-Einträge mit Rückgängig-Funktion, offene Abwesenheitskontrollen, eine Anwesenheitstabelle pro Klasse mit Hinweisen auf auffällige Fehlzeitenmuster, Erinnerungen über den ByCS-Messenger (das Skript füllt jeden Chat vor, du drückst nur noch Enter), aus mebis importierbare Pläne und ein Stundenkonto mit den Plus- und Minusstunden des Schuljahres. Meldet, wenn auf GitHub eine neue Version bereitsteht.'
  },
  {
    id: 'webuntis-raeume',
    title: 'WebUntis Räume für Gruppenarbeit',
    kind: 'Userscript',
    audience: ['teacher'],
    maturity: 5,
    url: 'https://github.com/B3-AWP/b3_enhance_webuntis',
    install: 'https://github.com/B3-AWP/b3_enhance_webuntis/raw/refs/heads/main/webuntis-room-labels.user.js',
    installNote: 'Mit Violentmonkey oder Tampermonkey, angemeldet bei GitHub (privates Repository).',
    summary: 'Zeigt bei der Raumbuchung in WebUntis, welche freien Räume sich für eine Kleingruppe eignen.',
    description: 'Für Gruppenarbeit im eigenen Raum: Auf der Seite zur Raumbuchung in WebUntis siehst du sofort, wo eine Kleingruppe von Lernenden selbstständig arbeiten kann – still oder im Gespräch. Geeignete Räume, die zur gewählten Zeit frei sind, bekommen „★ geeignet“ und stehen oben in der Liste; belegte und ungeeignete Räume treten zurück.'
  },
  {
    id: 'subnetting',
    title: 'B3 IPv4 Subnet Rechner',
    kind: 'Web-App',
    audience: ['student'],
    maturity: 5,
    compact: true,
    url: 'https://mamrehn.github.io/b3_ipv4_subnetting/',
    summary: 'IPv4-Subnetting interaktiv üben und nachrechnen.',
    description: 'Interaktive Web-App zum Erlernen von IPv4 Subnetting-Konzepten. Wird im FU-IT Unterricht (Fachunterricht IT) eingesetzt zur Vermittlung von Netzwerktechnik.'
  },
  {
    id: 'berufsschulpflicht',
    title: 'Berufsschulpflicht Check für Religion / Ethik / +R',
    kind: 'Web-App',
    audience: ['student', 'teacher'],
    maturity: 5,
    compact: true,
    url: 'https://mamrehn.github.io/b3_rel_eth_pr/',
    summary: 'Prüft Berufsschulpflicht und Befreiung von Religion/Ethik in Bayern.',
    description: 'Prüfung der Berufsschulpflicht und Religion/Ethik-Befreiung für Bayern.'
  },
  {
    id: 'notenrechner',
    title: 'Punkte zu Note',
    kind: 'Web-App',
    audience: ['student', 'teacher'],
    maturity: 4.1,
    compact: true,
    url: 'https://mamrehn.github.io/notenrechner/',
    summary: 'Rechnet Punkte nach dem IHK-Notenschlüssel in Noten um.',
    description: 'Ein Werkzeug zum Berechnen von Noten auf Basis von Punkten und dem IHK Notenschlüssel.'
  },
  {
    id: 'diffiefellows',
    title: 'DiffieFellows',
    kind: 'Web-App',
    audience: ['student'],
    maturity: 5,
    compact: true,
    url: 'https://mamrehn.github.io/diffiefellows/',
    summary: 'Simuliert einen Man-in-the-Middle-Angriff per „Evil Twin“ im WLAN: gleiche Adresse, doch die halbe Klasse bekommt ein anderes PDF.',
    description: 'Simulation eines Man-in-the-Middle-Angriffs über einen „Evil Twin“ im WLAN: Alle rufen dieselbe Adresse auf und laden die „Speisekarte“ als PDF herunter – doch die Hälfte der Klasse erhält eine andere Datei als der Rest. Welche ein Gerät bekommt, entscheidet ein Fingerabdruck des Browsers; beim erneuten Laden bleibt es dieselbe.'
  },
  {
    id: 'work-tracker',
    title: 'Git Work Time Tracker',
    kind: 'Python-Werkzeug',
    audience: ['teacher'],
    maturity: 4,
    compact: true,
    url: 'https://github.com/mamrehn/work_tracker',
    summary: 'Schätzt die Arbeitszeit pro Repository aus der Git-Historie.',
    description: 'Python-Tool zur Analyse von Git-Commit-Historien und Schätzung der Arbeitszeit pro Repository. Erkennt automatisch Arbeitsstreaks und unterstützt Datums- und Benutzerfilterung.'
  },
  {
    id: 'timers',
    title: 'Multi-Prüfung Zeitwächter',
    kind: 'Web-App',
    audience: ['teacher'],
    maturity: 2.0,
    compact: true,
    url: 'https://b3-awp.github.io/timers/',
    summary: 'Mehrere Prüfungs-Timer gleichzeitig im Blick behalten.',
    description: 'React Web-App zur Verwaltung mehrerer Timer für gleichzeitige Prüfungen. Ähnlich dem Prüfungs-Dashboard, aber fokussiert auf mehrere unterschiedliche Zeitanzeigen – ohne Notizen für die zu Prüfenden.'
  },
  {
    id: 'dual-llm',
    title: 'Interaktives Lernsystem mit lokalem Dual-LLM',
    kind: 'KI-Lernsystem',
    audience: ['student', 'teacher'],
    maturity: 2.2,
    summary: 'Lernen im Gespräch mit lokalen Sprachmodellen – ohne Cloud.',
    description: 'Simulierte Gespräche mit einem interaktiven Lernsystem mit lokalen Sprachmodellen für personalisiertes, datenschutzkonformes Lernen ohne Cloud-Anbindung.'
  },
  {
    id: 'coode-vibes',
    title: 'Coode Vibes',
    kind: 'Lernumgebung',
    audience: ['student'],
    maturity: 1,
    summary: 'Spielerischer Einstieg ins Programmieren mit Vibe Coding.',
    description: 'Vibe Coding Lernumgebung für einen spielerischen Einstieg in die Programmierung mittels modernem Vibe Coding.'
  }
];
