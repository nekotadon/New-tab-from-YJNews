document.addEventListener("click", (e) => {
    try {
        let url = location.href;
        if (url == "https://www.yahoo.co.jp/") {
            let counter = 0;
            let element = e.target;
            //whether parent element contains "A" tag
            while (element !== undefined && element !== null && counter <= 1000) {
                counter++;
                if (element instanceof HTMLElement) {
                    if (element.tagName == "A") {
                        if (element.hasAttribute("href")) {
                            let url = element.href;
                            if (url !== null && url.startsWith("https://news.yahoo.co.jp/pickup/")) {
                                //open link in new tab
                                e.stopImmediatePropagation();
                                e.preventDefault();
                                chrome.runtime.sendMessage(
                                    {
                                        action: "openInNewTab",
                                        targeturl: url
                                    }
                                ).catch(() => { });
                            }
                            break;
                        }
                    }
                    element = element.parentElement;
                }
            }
        }
    } catch (ex) {
        console.log(ex);
    }
}, true);