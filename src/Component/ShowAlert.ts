import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const showSwal = (
    errorTitle: string,
    errorMessage: string,
    status: number,
    navigateCallback?: () => void
) => {
    withReactContent(Swal).fire({
        icon: status >= 200 && status < 300 ? "success" : "error",
        title: errorTitle,
        text: errorMessage,
    });
    if (navigateCallback) {
        setTimeout(() => {
            navigateCallback();
        }, 1000);
    }
};
