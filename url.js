function validateUrl(url1) {
    var url = String(url1);
    if (url.startsWith("http://") || url.startsWith("https://")) {
        return true;
    } else {
        return false;
    }
}

function func() {
    var x = document.getElementById("input-longurl").value;
    var url = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${x}`;
    var img = document.getElementById("img");
    img.src = url;
}

const init = function () {
    document.getElementById('button-send').addEventListener('click', send);
}

const send = function (ev) {
    ev.preventDefault();
    ev.stopPropagation();

    var longUrl = document.getElementById('input-longurl').value;
    func();
    if (validateUrl(longUrl)) {
        const Http = new XMLHttpRequest();
        const baseUrl = `https://tinyurl.com/api-create.php?url=`;

        let url = baseUrl + longUrl;
        Http.open("GET", url);
        Http.send();

        Http.onreadystatechange = function () {
            document.getElementById('msg1').textContent = 'Long Url :';
            document.getElementById('longurl').textContent = longUrl;
            document.getElementById('longurl').href = longUrl;

            document.getElementById('msg2').textContent = 'Short Url :';
            document.getElementById('shorturl').textContent = this.responseText;
            document.getElementById('shorturl').href = this.responseText;

        }
    }
    else {
        document.getElementById('msg1').textContent = 'Note :';
        document.getElementById('longurl').textContent = 'Invadlid Link';
        document.getElementById('longurl').removeAttribute("href");
        document.getElementById('msg2').textContent = '';
        document.getElementById('shorturl').textContent = 'https:// or http:// format only';
        document.getElementById('shorturl').removeAttribute("href");
    }
}

window.addEventListener('load', () => {
    document.getElementById('button-send')
        .addEventListener('click', triggerDownload);

    document.getElementById('input-longurl')
        .addEventListener('keypress', e => {
            if (e.key === 'Enter') {
                triggerDownload(e);
            }
        })
});

const triggerDownload = async e => {
    let url = document.getElementById('img').src;
    url = new URL(url);
    let response = await fetch(url);
    let blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    const extension = extensions[blob.type];
    link.download = extension != null ? `QR.` + extension : 'file';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

const extensions = {
    'text/html': 'html',
    'text/css': 'css',
    'text/xml': 'xml',
    'image/gif': 'gif',
    'image/jpeg': 'jpeg',
    'application/x-javascript': 'js',
    'application/atom+xml': 'atom',
    'application/rss+xml': 'rss',

    'text/mathml': 'mml',
    'text/plain': 'txt',
    'text/vnd.sun.j2me.app-descriptor': 'jad',
    'text/vnd.wap.wml': 'wml',
    'text/x-component': 'htc',

    'image/png': 'png',
    'image/tiff': 'tif',
    'image/vnd.wap.wbmp': 'wbmp',
    'image/x-icon': 'ico',
    'image/x-jng': 'jng',
    'image/x-ms-bmp': 'bmp',
    'image/svg+xml': 'svg',
    'image/webp': 'webp',

    'application/java-archive': 'jar',
    'application/mac-binhex40': 'hqx',
    'application/msword': 'doc',
    'application/pdf': 'pdf',
    'application/postscript': 'ps',
    'application/rtf': 'rtf',
    'application/vnd.ms-excel': 'xls',
    'application/vnd.ms-powerpoint': 'ppt',
    'application/vnd.wap.wmlc': 'wmlc',
    'application/vnd.google-earth.kml+xml': 'kml',
    'application/vnd.google-earth.kmz': 'kmz',
    'application/x-7z-compressed': '7z',
    'application/x-cocoa': 'cco',
    'application/x-java-archive-diff': 'jardiff',
    'application/x-java-jnlp-file': 'jnlp',
    'application/x-makeself': 'run',
    'application/x-perl': 'pl',
    'application/x-pilot': 'prc',
    'application/x-rar-compressed': 'rar',
    'application/x-redhat-package-manager': 'rpm',
    'application/x-sea': 'sea',
    'application/x-shockwave-flash': 'swf',
    'application/x-stuffit': 'sit',
    'application/x-tcl': 'tcl',
    'application/x-x509-ca-cert': 'der',
    'application/x-xpinstall': 'xpi',
    'application/xhtml+xml': 'xhtml',
    'application/zip': 'zip',

    'application/octet-stream': 'bin',
    'application/octet-stream': 'deb',
    'application/octet-stream': 'dmg',
    'application/octet-stream': 'eot',
    'application/octet-stream': 'iso',
    'application/octet-stream': 'msi',

    'audio/midi': 'mid',
    'audio/mpeg': 'mp3',
    'audio/ogg': 'ogg',
    'audio/x-realaudio': 'ra',

    'video/3gpp': '3gpp',
    'video/mpeg': 'mpeg',
    'video/quicktime': 'mov',
    'video/x-flv': 'flv',
    'video/x-mng': 'mng',
    'video/x-ms-asf': 'asx',
    'video/x-ms-wmv': 'wmv',
    'video/x-msvideo': 'avi',
    'video/mp4': 'm4v'
};

document.addEventListener('DOMContentLoaded', init);