import Noty from "noty";


const error = (text: string) => {
    new Noty({
        text: text,
        type: "error",
        theme: "metroui",
        timeout: 3000
    }).show();
};

const warning = (text: string) => {
    new Noty({
        text: text,
        type: "warning",
        theme: "metroui",
        timeout: 3000
    }).show();
};

const info = (text: string) => {
    new Noty({
        text: text,
        type: "info",
        theme: "metroui",
        timeout: 3000
    }).show();
};

const success = (text: string) => {
    new Noty({
        text: text,
        type: "success",
        theme: "metroui",
        timeout: 3000
    }).show();
};

const alert = (text: string) => {
    new Noty({
        text: text,
        type: "alert",
        theme: "metroui",
        timeout: 3000
    }).show();
};

const confirmYesNo = (text: string, yesCallback: () => any, noCallback: () => any) => {
    const n = new Noty(
        {
            theme: "metroui",
            layout: "center",
            modal:true,
            text: text,
            buttons: [

                Noty.button('YES', 'btn btn-success', (n) => {
                    yesCallback();
                    n.close();
                }),
                Noty.button('NO', 'btn btn-error', (n) => {
                    noCallback();
                    n.close();
                })
            ]
        });

    n.show();
}

const confirmOkCancel = (text: string, okCallback: () => any, cancelCallback : () => any) => {
    const n = new Noty(
        {
            theme: "metroui",
            layout: "center",
            text: text,
            modal:true,
            buttons: [
                Noty.button('OK', 'btn btn-success', (n) => {
                    okCallback();
                    n.close();
                }),
                Noty.button('CANCEL', 'btn btn-error', (n) => {
                    cancelCallback();
                    n.close();
                })
            ]
        });

    n.show();
}


export default {
    error,
    warning,
    info,
    success,
    alert,
    confirmYesNo,
    confirmOkCancel
};

