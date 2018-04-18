//
//  NativeTest.m
//  MyProject
//
//  Created by sd on 2018/4/18.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "NativeTest.h"
@implementation NativeTest

// 导出模块，不添加参数即默认为这个类名
RCT_EXPORT_MODULE();

// 导出方法，桥接到js的方法返回值类型必须是void
RCT_EXPORT_METHOD(doSomething:(NSString *)cityName){
  NSLog(@"%@ ===> doSomething",cityName);
  // 第一步:找到主目录文件夹
  NSString * homePath = NSHomeDirectory();
  // 第二步:然后拼接自己想进入的路径
  NSString * documentPath = [homePath stringByAppendingPathComponent: @"Documents"];
  NSString * libraryPath = [homePath stringByAppendingPathComponent: @"Library"];
  // 第三步:需要知道字符串最终存储的地方，所以需要创建一个路径去存储字符串
  NSString *strPath = [documentPath stringByAppendingPathComponent:@"text.txt"];
  // 第四步:将字符串写入文件
  // 第一个参数：写入的文件的一个路径
  // 第二个参数：编码方式
  // 第三个参数：错误信息
  [cityName writeToFile:strPath atomically:YES encoding:NSUTF8StringEncoding error:nil];
  
  // 将字符串取出,使用stringWithContentsOfFile这个方法将其取出
  // 第一个参数：字符串存储的路径
  // 第二个参数：编码方式
  // 第三个参数：错误信息
  NSString * newStr = [NSString stringWithContentsOfFile:strPath encoding:NSUTF8StringEncoding error:nil];
  NSLog(@"所在城市: = %@", newStr);
}

@end
