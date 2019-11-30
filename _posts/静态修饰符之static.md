---
title: 静态修饰符之static
tags:
  - Java
date: 2017-04-16
---


在Java中，可以基于一个类创建多个对象，每个对象相互独立且拥有自己的成员。当我们希望该类的所有对象共享一个成员时，可以用 *static* 来修饰一个成员，称之为静态成员或类成员，可以使用类名或对象名进行访问（**推荐用类名直接访问**）
<!-- more -->
# 一、static之静态变量
static修饰的变量称为静态变量，可以被所有类共享，直接使用类名来访问，无需创建类的对象。也可以创建对象来访问该变量。

```java
public class HelloWord{
	static String test = "hello";
    public static void main(String[] args) {
		System.out.println("通过类名访问test：" + HelloWord.test);
		HelloWord hello = new HelloWord();
		System.out.println("通过对象名访问test：" + hello.test);
	}
}
```

静态成员属于整个类，当系统第一次使用该类时，就会为其分配内存直到该类被卸载才会进行资源回收。
# 二、static之静态方法
static修饰的方法称为静态方法或类方法，可以直接使用类名调用静态方法，也可以通过对象名调用。

```java
public class HelloWord{
	public static void print(){
		System.out.println("使用static声明静态方法");
	}
	public static void main(String[] args) {
	HelloWord.print();  //直接使用类名调用静态方法
	HelloWord hello = new HelloWord();
	hello.print();      //通过对象名调用静态方法
	}
}
```
#### 注意点 ：

> 1. 静态方法可以直接调用同类中的静态成员，但不能直接调用非静态成员，若要调用非静态变量需创建类的对象，然后通过对象来访问非静态变量。
> 2. 同理，静态方法中，不能直接调用非静态方法，要通过对象访问。
> 3. 在普通成员方法中，可以直接访问同类的非静态变量和静态变量。
 
```java
public class HelloWord{
	String name = "hello";
	static String name1 = "world";
	public static void print(){
		System.out.println(name + "world");     //不能直接调用非静态变量
		HelloWord hello = new HelloWord();
		System.out.println(hello.name + "world");     //通过对象调用

		System.out.println("hello" + name1);
	}
}
```

# 三、static之静态初始化块
静态初始化块：使用static定义,当类装载到系统时***执行一次***。若在静态初始化块中想初始化变量,那仅能初始化类变量,即static修饰的数据成员。而不能初始化普通的成员变量。

```java

public class HelloWord{
	int num1;
	int num2;
	static int num3;
	public HelloWord(){
		num1 = 10;
		System.out.println("通过构造方法为num1赋值");
	}
	{
		num2 = 20;
		System.out,println("通过初始化块为num2赋值");
	}
	static {
		num3 = 30;
		System.out.println("通过静态初始化块为静态变量num3赋值");
	}
	public static void main(String[] args) {
		HelloWord hello = new HelloWord();   //创建类的对象hello
		System.out.println("num1=" + hello.num1);
		System.out.println("num2=" + hello.num2);
		System.out.println("num3=" + num3);
		HelloWord hello2 = new HelloWord();  //再创建类的对象
	}
}
```

运行结果：
> 通过静态初始化块为静态变量num3赋值
> 通过初始化块为num2赋值
> 通过构造方法为num1赋值
> num1=10
> num2=20
> num3=30
> 通过初始化块为num2赋值
> 通过构造方法为num1赋值

可见程序运行时先执行静态初始化块，再执行普通初始化块，最后执行构造方法。而静态初始化块只执行一次。



	




