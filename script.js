document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("preferences-form");
  const fontsizeInput = document.getElementById("fontsize");
  const fontcolorInput = document.getElementById("fontcolor");

  // Load user preferences from cookies
  function loadPreferences() {
    const storedFontsize = getCookie("fontsize");
    const storedFontcolor = getCookie("fontcolor");
    
    if (storedFontsize) {
      document.documentElement.style.setProperty("--fontsize", storedFontsize);
      fontsizeInput.value = storedFontsize;
    }

    if (storedFontcolor) {
      document.documentElement.style.setProperty("--fontcolor", storedFontcolor);
      fontcolorInput.value = storedFontcolor;
    }
  }

  loadPreferences();

  // Save user preferences to cookies
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const fontsize = fontsizeInput.value + "px";
    const fontcolor = fontcolorInput.value;

    document.documentElement.style.setProperty("--fontsize", fontsize);
    document.documentElement.style.setProperty("--fontcolor", fontcolor);

    setCookie("fontsize", fontsize, 365);
    setCookie("fontcolor", fontcolor, 365);
  });

  // Utility function to set a cookie
  function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + value + ";expires=" + expires.toUTCString();
  }

  // Utility function to get a cookie by name
  function getCookie(name) {
    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split("=");
      if (cookieName.trim() === name) {
        return cookieValue;
      }
    }
    return null;
  }
});
