var openseadragon = require('../lib/openseadragon');

module.exports = (ctx) => {
  var osd = document.getElementsByClassName('osd__toolbar');
  if (osd) {
    Array.prototype.slice.call(osd).forEach(function (el) {
      el.addEventListener('click', function (e) {
        if (!ctx.viewer) {
          openseadragon.init(ctx);
        }
        if (e.target.id === 'osd-fullpage') {
          ctx.viewer.setFullScreen(true);
        } else if (e.target.id === 'osd-home') {
          openseadragon.quit(ctx);
        }
      });
    });
  }
};
