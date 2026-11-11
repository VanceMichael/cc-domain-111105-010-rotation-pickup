import {stat,readFile} from 'node:fs/promises';
export function describeSample(bytes,encoding='utf-8') {
  const b=Buffer.from(bytes);
  if(!['utf-8','utf-16le'].includes(encoding)) throw new Error('设备编码不受支持');
  const text=new TextDecoder(encoding,{fatal:true}).decode(b);
  return {bytes:b.length,encoding,lineBreaks:(text.match(/\n/g)||[]).length,lastCodePoint:text.length?text.codePointAt(text.length-1):null};
}
export async function fileObservation(path) {
  const s=await stat(path,{bigint:true});
  if(!s.isFile()) throw new Error('不是普通文件');
  const bytes=await readFile(path);
  return {identity:`${s.dev}:${s.ino}`,observedSize:String(s.size),bytes};
}
export const inspect=describeSample;
