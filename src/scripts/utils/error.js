function error(msg) {
  if (topWindow.console) {
    if (topWindow.console.error) {
      topWindow.console.error(msg);
    } else if (topWindow.console.log) {
      topWindow.console.log(msg);
    }
  }
}

export { error };