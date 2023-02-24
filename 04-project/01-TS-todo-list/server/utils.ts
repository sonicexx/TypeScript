// 读取文件 API
import { readFileSync, writeFileSync } from 'fs'; //同步读取数据文件：readFileSync(文件地址, 编码格式)
import { resolve } from 'path'; //地址信息拼接：resolve(当前地址, 文件名)、__dirname--当前文件路径
import { iTodoData } from '../src/js/typing';

// 读取文件方法封装
export function myReadFile(path: string): string {
  return readFileSync(resolve(__dirname, path), 'utf-8');
}

// 写入文件方法封装
//无法确定传回来的数据是 字符串/对象/数组，使用泛型，使用时调用
export function myWriteFile<T>(path: string, data: T): void {
  console.log(data);
  console.log(JSON.stringify(data));
  writeFileSync(resolve(__dirname, path), JSON.stringify(data));
}

// 文件处理方法封装：读取文件 》将数据传回参数函数进行处理 》将返回的处理好的数据写入文件
export function fileOperation(path: string, fn?: Function): string | void {
  // 读取文件 》 parse 出来数据
  let todoList: iTodoData[] = JSON.parse(myReadFile(path) || '[]');

  // 没有数据处理函数，直接返回获取到的数据
  if (!fn) return JSON.stringify(todoList);

  // 有数据处理函数参数，将数据处理后的数据返回
  todoList = fn(todoList);

  // 写入处理后的数据
  myWriteFile<iTodoData[]>(path, todoList);
}
