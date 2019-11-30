---
title: Java中的内部类
tags:
  - Java
date: 2017-04-19
---

内部类就是在一个类里面定义一个类。内部类不允许同个包中的其他类访问，可以直接访问包括私有数据在内的外部类的所有数据，分为成员内部类、静态内部类和方法内部类。



要使用内部类的方法时，首先创建了一个外部类对象，在创建内部类对象时，通过外部类对象.new 内部类（）的形式。可以理解为：要使用内部类的方法，首先需要将外部类实例化为一个对象，然后通过外部类的对象对内部类进行实例化，最后再调用内部类的方法。
<!-- more -->

# 一、成员内部类
**成员内部类的使用方法：**
 1、内部类可以使用任意访问控制符
 2、内部类中定义的方法可以直接访问外部类中的数据，而不受访问控制符的影响。
 3、定义了成员内部类后，必须使用外部类对象来创建内部类对象，    
      即：内部类 对象名 = 外部类对象.new 内部类( );

```java
public class Outer{
	private int a = 99;
	public class Inner{
		int b = 20;
		public void test(){
			System.out.println("访问外部类中的a：" + a);
			System.out.println("访问内部类中的b：" + b);
		}
	}
	public static void main(String[] args) {
		Outer o = new Outer();  //创建外部对象o
		Inner i = o.new Inner();  //使用外部类对象创建内部类对象i
		i.test();    //调用内部对象的test方法
	}
}
```
结果为：
访问外部类中的a：99
访问内部类中的b：20
*注意点：*

* 外部类不能直接使用内部类的成员和方法，解决方法为：可先创建内部类的对象，然后通过内部类的对象来访问其成员变量和方法。 

```java
public class HelloWord{
	public class Outer{
		public void Show(){
			System.out.println("Hello");
		}
		public void print(){
			Outer in = new Outer();
			in.Show();
		}
	}
}
```
* 如果外部类和内部类具有相同的成员变量或方法，内部类默认访问自己的成员变量或方法，外部类用this关键字访问。

```java
public class Outer{
	int a = 10;
	public class Inner{
		int a = 20;
		public void test(){
			System.out.println("访问外部类中的a:" + Outer.this.b);
			System.out.println("访问内部类中的b:" + b);
		}
	}
}
```
# 二、静态内部类
静态内部类是 static 修饰的内部类，这种内部类的特点是：

* 1、静态内部类不能直接访问外部类的非静态成员，但可以通过 new 外部类().成员 的方式访问 

* 2、 如果外部类的静态成员与内部类的成员名称相同，可通过“类名.静态成员”访问外部类的静态成员；如果外部类的静态成员与内部类的成员名称不相同，则可通过“成员名”直接调用外部类的静态成员

* 3、 创建静态内部类的对象时，不需要外部类的对象，可以直接创建 内部类 对象名= new 内部类();

```java
//外部类
public class HelloWorld {
 
    // 外部类中的静态变量score
    private static int score = 84;
    
    // 创建静态内部类
	public  static class SInner {
        // 内部类中的变量score
        int score = 91;
        
		public void show() {
			System.out.println("访问外部类中的score：" +  HelloWorld.score          );
			System.out.println("访问内部类中的score：" + score);
		}
	}

	// 测试静态内部类
	public static void main(String[] args) {
		// 直接创建内部类的对象
        SInner si = new SInner();
        
        // 调用show方法
		si.show();
	}
}
```
运行结果：
访问外部类中的score：84
访问内部类中的score：91
# 三、方法内部类
方法内部类就是内部类定义在外部类的方法中，方法内部类只在该方法的内部可见，即只在该方法内可以使用。

```java
//外部类
public class HelloWorld {
    
    private String name = "爱慕课";
    
    // 外部类中的show方法
    public void show() { 
		// 定义方法内部类
		class MInner {
			int score = 83;
			public int getScore() {
				return score + 10;
			}
		}
        
		// 创建方法内部类的对象
        MInner mi = new MInner();
        
        // 调用内部类的方法
		int newScore = mi.getScore();
        
		System.out.println("姓名：" + name + "\n加分后的成绩：" + newScore);
	}
    
	// 测试方法内部类
	public static void main(String[] args) {
        
		// 创建外部类的对象
        HelloWorld mo = new HelloWorld();
        
        // 调用外部类的方法
		mo.show();
	}
}
```
***注意点：***
由于方法内部类不能在外部类的方法以外的地方使用，因此方法内部类不能使用访问控制符和 static 修饰符。




