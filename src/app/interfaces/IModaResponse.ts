export interface IModalResponse{
  status:'success'|'error',
  title:string,
  description:string,
  onOK?:()=>void
}