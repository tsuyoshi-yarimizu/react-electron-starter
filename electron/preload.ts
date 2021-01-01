import { contextBridge, ipcRenderer } from "electron";

/**
 * nodeIntegration: false (= ほぼ Web と同じ ) であるため、
 * 本来ならレンダラープロセスで Electron の機能は使えない。
 * /

/**
 * Window オブジェクトに ipcRenderer メソッドを追加し、
 * レンダラープロセスからも利用できるようにする。
 */
// window.ipcRenderer = ipcRenderer;

// ContextBridge.
// @see https://qiita.com/sprout2000/items/5253a8dee40197359949
contextBridge.exposeInMainWorld("myAPI", {
  openDialog: async (): Promise<void | string[]> =>
    await ipcRenderer.invoke("open-dialog"),
  readFile: async (): Promise<void | Buffer> =>
    await ipcRenderer.invoke("read-file"),
  store: async (item: any, db = "default"): Promise<any | Error> =>
    await ipcRenderer.invoke("store", item, db),
  find: async (options: any, db = "default"): Promise<any | Error> =>
    ipcRenderer.invoke("find", options, db),
});
