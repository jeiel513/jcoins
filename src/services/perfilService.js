export function salvarAvatar(imagem){

  localStorage.setItem(
    "avatar",
    imagem
  );

}



export function buscarAvatar(){

  return localStorage.getItem("avatar");

}
