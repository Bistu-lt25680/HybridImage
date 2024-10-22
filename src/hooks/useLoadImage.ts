export function LoadImage(imageId: string) {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  let imageElement: HTMLImageElement = document.getElementById(
    imageId
  ) as HTMLImageElement;
  input.onchange = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event: any) => {
      imageElement.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };
  input.click();
}
