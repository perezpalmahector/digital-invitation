export const googleDriveConfig = {
  fileId: "1rxE8GW-j7XYWjO2jaDPL6oXxPkLEDwfm",

  get downloadUrl() {
    return `https://drive.google.com/uc?export=download&id=${this.fileId}`;
  },
};
