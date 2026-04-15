(function(NX) {
  NX.State = {
    currentUser: 'guest',
    cwd: '~',
    commandCount: 0,
    sessionStart: Date.now(),
    activeThemeName: 'GREEN',
    firstBootSeen: false,
  };
})(window.NX = window.NX || {});
