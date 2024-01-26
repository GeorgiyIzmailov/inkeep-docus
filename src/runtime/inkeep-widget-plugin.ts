import { defineNuxtPlugin } from "#app";
import { useRuntimeConfig } from "#imports";

const WIDGET_VERSION = "0.2.258";

// Function to create and append a script tag for Inkeep
function createInkeepScriptElement() {
  const script = document.createElement("script");
  script.src = `https://unpkg.com/@inkeep/widgets-embed@${WIDGET_VERSION}/dist/embed.js`;
  script.type = "module";
  script.defer = true;
  document.head.appendChild(script);
  return script;
}
// Function to create and append a div tag for Inkeep
function createInkeepDivElement() {
  const div = document.createElement("div");
  div.id = "inkeep";
  return div;
}
// Observe theme changes in the document and update Inkeep widget accordingly
function observeThemeChange(widget: any, inkeepConfig: any) {
  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.attributeName === "class") {
        const isDark = mutation.target.classList.contains("dark");
        widget.render({
          baseSettings: {
            ...inkeepConfig.baseSettings,
            colorMode: {
              forcedColorMode: isDark ? "dark" : "light",
            },
          },
        });
      }
    }
  });
  observer.observe(document.documentElement, { attributes: true });
}

const initializeSearchBar = () => {
  const inkeepDiv = createInkeepDivElement();
  const rightSectionBar = document.querySelector(".right");
  if (rightSectionBar) {
    const observer = new MutationObserver(() => {
      rightSectionBar.appendChild(inkeepDiv);
    });
    observer.observe(document.documentElement, { attributes: true });
  }

  return inkeepDiv;
};

// Initialize Inkeep widget
function initializeWidget({
  inkeepConfig,
  isCurrentlyDark,
  componentType,
  targetElement,
}: {
  inkeepConfig: any;
  isCurrentlyDark: boolean;
  componentType: string;
  targetElement: any;
}) {
  const inkeepWidget = Inkeep().embed({
    componentType,
    targetElement,
    properties: {
      ...inkeepConfig,
      baseSettings: {
        ...inkeepConfig.baseSettings,
        colorMode: {
          forcedColorMode: isCurrentlyDark ? "dark" : "light",
        },
      },
    },
  });
  return inkeepWidget;
}

function addInkeepWidget(
  inkeepConfig: any,
  isCurrentlyDark: boolean,
  targetElement: any
) {
  const inkeepScript = createInkeepScriptElement();
  // Once the script is loaded, initialize the Inkeep widget
  inkeepScript.addEventListener("load", () => {
    let chatButton, searchBar;

    switch (inkeepConfig?.componentType) {
      case "ChatButton":
        chatButton = initializeWidget({
          inkeepConfig,
          targetElement: null,
          componentType: "ChatButton",
          isCurrentlyDark,
        });

        observeThemeChange(chatButton, inkeepConfig);
        return;
      case "SearchBar":
        searchBar = initializeWidget({
          inkeepConfig,
          targetElement,
          componentType: "SearchBar",
          isCurrentlyDark,
        });

        observeThemeChange(searchBar, inkeepConfig);
        return;
      default:
        // Initialize both search bar and chat button components
        chatButton = initializeWidget({
          inkeepConfig,
          targetElement: null,
          componentType: "ChatButton",
          isCurrentlyDark,
        });

        searchBar = initializeWidget({
          inkeepConfig,
          targetElement,
          componentType: "SearchBar",
          isCurrentlyDark,
        });

        observeThemeChange(searchBar, inkeepConfig);
        observeThemeChange(chatButton, inkeepConfig);
        return;
    }
  });
}
// Define Nuxt.js plugin
export default defineNuxtPlugin({
  name: "inkeep-widget",
  async setup() {
    const {
      public: { inkeepConfig },
    } = useRuntimeConfig();
    if (!inkeepConfig) {
      throw new Error(
        "Configuration Error: inkeepConfig is missing in the Nuxt configuration file"
      );
    }

    // Check if the document is available
    if (!document) return;

    let inkeepDiv;
    const isChatButton = inkeepConfig?.componentType === "ChatButton";
    const isCurrentlyDark = document.documentElement.classList.contains("dark");
    if (!isChatButton) {
      // Initialize search bar container
      inkeepDiv = initializeSearchBar();
    }

    // Initialize the Inkeep widget
    addInkeepWidget(inkeepConfig, isCurrentlyDark, inkeepDiv);
  },
});
