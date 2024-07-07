interface ConfirmDeletePopupProps {
    movieId: string;
    closePopup: () => void;
    onResult: (message: string) => void;
  }