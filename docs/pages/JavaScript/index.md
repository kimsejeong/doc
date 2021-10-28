## JavaScript 篇

### JavaScript 有⼏种类型的值

- 栈：原始数据类型（ Undefined、Null、Boolean、Number、String、Symbol、BigInt ）
- 堆：引⽤数据类型（对象、数组和函数）
- 两种类型的区别是：存储位置不同
  - 原始数据类型直接存储在栈( stack )中的简单数据段，占据空间⼩、⼤⼩固定，属于被频 繁使⽤数据，所以放⼊栈中存储；
  - 引⽤数据类型存储在堆( heap )中的对象,占据空间⼤、⼤⼩不固定,如果存储在栈中，将会 影响程序运⾏的性能；引⽤数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址。当解释器寻找引⽤值时，会⾸先检索其在栈中的地址，取得地址后从堆中获得实体

三种数据结构分别是**堆(heap)，栈(stack)与队列(queue)**

| 基础数据类型               | 栈数据结构     | **先进后出，后进先出**（乒乓球盒子） |
| -------------------------- | -------------- | ------------------------------------ |
| **引用数据类型**           | **堆数据结构** | **树状结构（书架与书）**             |
| **事件循环（Event Loop）** | **队列**       | **先进先出（排队）**                 |

### JavaScript 中的 Symbol 是什么？

ES6 引入了一种新的原始数据类型 Symbol ，表示独一无二的值，主要是用来定义对象的唯一属性名。

你也可以给每个 Symbol 起一个名字：

```text
var race = {
  protoss: Symbol('protoss'),
  terran: Symbol('terran'),
  zerg: Symbol('zerg')
}
```

不过这个名字跟 Symbol 的值并没有关系，你可以认为这个名字就是个注释。如下代码可以证明 Symbol 的名字与值无关：

```text
var a1 = Symbol('a')
var a2 = Symbol('a')
a1 !== a2 // true
```

Symbol 生成一个全局唯一的值。

1.Symbol.for()

作用：用于将描述相同的 Symbol 变量指向同一个 Symbol 值；

```js
let a1 = Symbol.for("a");
let a2 = Symbol.for("a");
a1 === a2; // true
typeof a1; // "symbol"
typeof a2; // "symbol"
let a3 = Symbol("a");
a1 === a3; // false
```

Symbol()和 Symbol.for()的相同点： 1.它们定义的值类型都为"symbol"； Symbol()和 Symbol.for()的不同点： 1.Symbol()定义的值每次都是新建，即使描述相同值也不相等； 2.Symbol.for()定义的值会先检查给定的描述是否已经存在，如果不存在才会新建一个值，并把这个值登记在全局环境中供搜索，Symbol.for()定义相同描述的值时会被搜索到，描述相同则他们就是同一个值。

2.Symbol.keyFor()

作用：用来检测该字符串参数作为名称的 Symbol 值是否已被登记，返回一个已登记的 Symbol 类型值的 key

```js
let a1 = Symbol.for("a");
Symbol.keyFor(a1); // "a"
let a2 = Symbol("a");
Symbol.keyFor(a2); // undefined
```

上述代码中`a1`已经用 Symbol.for()登记过，因此返回的 key 为"a"，而`a2`没有被登记，因此返回 undefined

3.Symbol 解决数据重复覆盖问题

在对象中如果 key 名重复，后面的 key 会把前面的 key 覆盖掉，使用 symbol 类型定义唯一值，可以避免覆盖问题

相同姓名的同学成绩不一样，用 symbol 区分

```js
let user1 = { name: "李四", key: Symbol() };
let user2 = { name: "李四", key: Symbol() };
let grade = {
  [user1.key]: { js: 99, css: 89 },
  [user2.key]: { js: 56, css: 100 },
};
console.log(grade[user2.key]); // { js: 56, css: 100 }
```

### 介绍 JavaScript 有哪些内置对象

- Object 是 JavaScript 中所有对象的⽗对象
- 数据封装类对象： 普通对象-Object 、 数组对象-Array 、 Boolean 、 Number 和 String
- 其他对象： 函数对象-Function 、 Arguments 、 数学函数-Math 、 日期对象-Date 、 正则对象-RegExp 、 Error

### null，undefined 的区别

- undefined 表示不存在这个值
- undefined : 是⼀个表示"⽆"的原始值或者说表示"缺少值"，就是此处应该有⼀个值，但是还没有定义。例如变量被声明了，但没有赋值时，就等于 undefined
- null 表示⼀个对象被定义了，值为“空值”
- null : 是⼀个对象(空对象, 没有任何属性和⽅法) 例如作为函数的参数，表示该函数的参数不是对象；在验证 null 时，⼀定要使⽤ === ，因为 == ⽆法分别 null 和 undefined

### 判断数据类型￥

#### typeof

对于原始类型来说，除了 null 都可以调用 typeof 显示正确的类型。

```js
typeof 1; // 'number'
typeof "1"; // 'string'
typeof undefined; // 'undefined'
typeof true; // 'boolean'
typeof Symbol(); // 'symbol'
```

但对于引用数据类型，除了函数之外，都会显示"object"。

```js
typeof []; // 'object'
typeof {}; // 'object'
typeof console.log; // 'function'
```

关于 typeof 操作符，当操作数为 null 时。

```js
typeof null; // object
```

#### instanceof

因此采用 typeof 判断对象数据类型是不合适的，采用 instanceof 会更好，instanceof 的原理是基于原型链的查询，只要处于原型链中，判断永远为 true

```js
const Person = function () {};
const p1 = new Person();
p1 instanceof Person; // truevar str1 = "hello world";str1 instanceof String; // falsevar str2 = new String("hello world");str2 instanceof String; // true
```

对于原始类型来说，你想直接通过 instanceof 来判断类型是不行的，我们还是有办法让 instanceof 判断原始类型的

```js
class PrimitiveString {static [Symbol.hasInstance](x) {return typeof x === 'string'}console.log('hello world' instanceof PrimitiveString) // true
```

其实就是自定义 instanceof 行为的一种方式，这里将原有的 instanceof 方法重定义，换成了 typeof，因此能够判断基本数据类型。

#### constructor 属性

原理：每一个实例对象都可通过 constructor 来访问它的构造函数,其实也是根据原型链的原理来的。

```
'5'.__proto__.constructor === String // true[5].__proto__.constructor === Array // trueundefined.__proto__.constructor // Cannot read property '__proto__' of undefinednull.__proto__.constructor // Cannot read property '__proto__' of undefined
```

由于 undefined 和 null 是无效的对象，因此是没有 constructor 属性的,这两个值不能用这种方法判断.

#### toString 方法

```js
// 利用toString方法基本上可以解决所有内置对象类型的判断：Object.prototype.toString.call("5"); // [object String]Object.prototype.toString.call(5); // [object Number]Object.prototype.toString.call([5]); // [object Array]Object.prototype.toString.call(true); // [object Boolean]Object.prototype.toString.call(undefined); // [object Undefined]Object.prototype.toString.call(null); // [object Null]Object.prototype.toString.call(new Function()); // [object Function]Object.prototype.toString.call(new Date()); // [object Date]Object.prototype.toString.call(new RegExp()); // [object RegExp]Object.prototype.toString.call(new Error()); // [object Error]
```

- typeof 适合基本类型和 function 类型的检测，无法判断 null 与 object
- instanceof 适合自定义对象，也可以用来检测原生对象，需要注意 Object.create(null)对象的问题
- constructor 基本能判断所有类型，除了 null 和 undefined，但是 constructor 容易被修改
- toString 能判断所有类型，可将其封装为全能的 DataType()判断所有数据类型

### 数据类型转换

类型转换可以分为两种：🌛`隐式类型转换`和 ☀️`显式类型转换`。

**显式类型强制转换**比如：`Number(value)`。

**隐式类型转换**是指在对不同类型的值使用运算符时，值可以在类型之间自动的转换，比如 `1 == null`。

在 JS 中只有 3 种类型的转换:转化为 Number 类型;转化为 String 类型;转化为 Boolean 类型

#### 转换为 boolean

☀️`显式`：`Boolean()`方法

🌛`隐式`：隐式类型转换通常在逻辑判断或者有逻辑运算符时被触发（|| && !）。

```js
Boolean(2); // 显示类型转换if (2) {} // 逻辑判断触发隐式类型转换!!2; // 逻辑运算符触发隐式类型转换2 || "hello"; // 逻辑运算符触发隐式类型转换
```

条件判断时，除 `undefined`， `null`， `false`， `NaN`， `''`， `0`， `-0`，其他所有值都转为 `true`，包括所有对象。

#### 转换为 string

☀️`显式`：`String()`方法

```js
String([1, 2, 3]); //"1,2,3"String({}); //"[object Object]"
```

🌛`隐式`：隐式转换通常在有 `+` 运算符并且有一个操作数是 string 类型时被触发。

1. 有两边，一边是字符串，则会变成字符串拼接；
2. 有两边，一边是对象

```js
1 + "123"; //"1123"1 + {}; //"1[object Object]"
```

#### 转换为 number

☀️`显式`：`Number()`方法

- 字符串转换为数字：空字符串变为 0，如果出现任何一个非有效数字字符，结果都是 NaN

```js
Number(""); //0Number("10px"); //NaNNumber("10"); //10
```

- 布尔转换为数字

```js
Number(true); //1Number(false); //0
```

- null 和 undefined 转换成数字

```js
Number(null); //0Number(undefined); //NaN
```

- Symbol 无法转换为数字，会报错：Uncaught TypeError: Cannot convert a Symbol value to a number

```js
Number(Symbol()); //Uncaught TypeError: Cannot convert a Symbol value to a number
```

- BigInt 去除“n”

```js
Number(12312412321312312n); //12312412321312312
```

- 对象转换为数字，会按照下面的步骤去执行

1. 先调用对象的 `Symbol.toPrimitive` 这个方法，如果不存在这个方法
2. 再调用对象的 `valueOf` 获取原始值，如果获取的值不是原始值
3. 再调用对象的 `toString` 把其变为字符串
4. 最后再把字符串基于`Number()`方法转换为数字

```js
let obj = { name: "xxx" };
console.log(obj - 10); // 数学运算：先把obj隐式转换为数字，再进行运算//运行机制obj[Symbol.toPrimitive]; //undifinedobj.valueof(); // {name:xxx}obj.toString(); // [object object]Number("[object object]"); // NaNNaN - 10; // NaN
```

🌛`隐式`：number 的隐式类型转换是比较复杂的，因为它可以在下面多种情况下被触发。

- 比较操作（>, <, <=, >=）
- 按位操作（| & ^ ~）
- 算数操作（- + \* / %）， **注意**：当 + 操作存在任意的操作数是 string 类型时，不会触发 number 类型的隐式转换
- 一元 + 操作

### 用到的 String 方法

1. str.charAt(index) 返回指定位置的字符。

```js
// console.log(str.charAt(6)); // d
```

2. concat() 用于连接两个或多个字符串。

```js
var a = "hello",
  b = "kitty",
  c = "!";
a.concat(b, c); // 功能和 “+” 拼接没啥两样
```

3. indexOf() 方法 返回指定字符串在字符串中**首次出现的位置**。匹配不到则返回-1。

```js
// var str = "abc123def666";// console.log(str.indexOf("123"));    // 3
```

6. slice() 提取字符串中的一部分，并返回这个新的字符串

```js
// var str = "abc123def666";// 获取索引号为1，2，3的字符串，即[1, 4)// console.log(str.slice(1, 4)); // bc1
```

7. split() 用于把一个字符串分割成字符串数组。

```js
// var str = "abc123def666";// console.log(str.split("1")); // ["abc", "23def666"]
```

8. substr() 方法返回字符串中从指定位置开始到指定长度的子字符串。

```js
// var str = "abc123def666";// 开始位置 和 长度// console.log(str.substr(3, 3)); // 123
```

9. substring() 返回字符串两个索引之间（或到字符串末尾）的子串。

```js
// var str = "abc123def666";// 开始位置 和 结束位置// console.log(str.substring(3, 6)); //
```

10. trim() 删除一个字符串两端的空白字符

```js
// str = "  abc123   def666  ";// console.log("|" + str.trim() + "|"); // |abc123   def666|
```

11. toUpperCase() / toLowerCase() 用于字符串转换大小写

### 统计出现次数最多的字符串，及其最大值和最大值对应的字符串

```js
<script>  // 统计出现次数最多的字符串；并且输出其字符和对应的最大值  var str = '12312151421479571356384238141'  // 空对象用来收集字符串  var obj = {}  for (var i = 0; i < str.length; i++) {    // 查询每一项字符    var key = str.charAt(i)    if (obj[key] == undefined) {      // 等于undefined说明第一次，添加进去      obj[key] = 1;    } else {      // 不为undefined说明不是第一次，进行+1      obj[key] += 1;    }  }  console.log(obj);  var max = 0  var max_str;  for (var k in obj) {    if (max < obj[k]) {      max = obj[k]      max_str = k    }  }  console.log(max, max_str);</script>
```

### 遍历对象属性￥

#### 属性的可枚举性

##### 可枚举属性

通常我们给对象定义、或者新增一个属性的方式基本如下

```
let obj = { a: 1 }obj.b = 2
```

上面代码给`obj`对象添加了`a`、`b`两个属性，这两个属性都是**可枚举**的

##### 不可枚举属性

那么怎么让添加的属性不可枚举呢，见如下代码

```
Object.defineProperty(obj,'c',{  enumerable: false,  value: 3})
```

上面代码，又给`obj`添加了一个`c`属性，此时`c`属性就是**不可枚举**的。关键就是`enumerable: false`这句代码，如果不特别给`enumerable`赋值成`false`，那么默认都是可枚举的

##### 如何判断

判断对象中的某个属性是否可枚举，js 有提供原生的`propertyIsEnumerable`方法

```
obj.propertyIsEnumerable('a')   // trueobj.propertyIsEnumerable('b')   // trueobj.propertyIsEnumerable('c')   // false 只有`c`是不可枚举的
```

#### 原型链属性

有的属性不是直接存在于对象中，而是存在于对象的原型链中

##### 添加原型链属性

```
Object.prototype.d = 4
```

上面代码，给`Object`的原型链添加了一个属性`d`。此时`d`没有直接存在于`obj`中，而是存在于`obj`的原型链上

##### 如何判断

**in**

通常我们会直接用`in`来判断某个属性是不是存在某个对象中

```
'a' in obj   // true'b' in obj   // true'c' in obj   // true'd' in obj   // true 上面结果表明`in`操作符会检查属性是否在对象以及其原型链中
```

**hasOwnProperty**

`hasOwnProperty`也可以来判断属性是否在对象中

```
obj.hasOwnProperty('a')     // trueobj.hasOwnProperty('b')     // trueobj.hasOwnProperty('c')     // trueobj.hasOwnProperty('d')     // false
```

和`in`对比一下，大家可以看出差别，`obj.hasOwnProperty('d')`的结果是`false`，而`d`是添加在原型链中的属性，所以`hasOwnProperty`只会检查属性是否在**对象本身**，而不会去检查是否在原型链中

**两者结合**

所以结合`in`和`hasOwnProperty`我们就可以知道某个属性是直接在对象中，还是在对象的原型链中

```
'd' in obj && !obj.hasOwnProperty('d')   // true  (属性在原型链中)
```

#### 第一种： for......in

```
const obj = {id:1,name:'zhangsan',age:18}for(let key in obj){    console.log(key + '---' + obj[key])}
```

![img](pic\1422714-20180907170531377-588557250.png)

#### 第二种 Object.keys（obj） Object.values（obj）

返回值：一个表示给定对象的所有可枚举属性的字符串数组。

```
const obj = {id:1,name:'zhangsan',age:18}console.log(Object.keys(obj))console.log(Object.values(obj))
```

输出结果： obj 对象的 key 组成的数组['id','name','age']

输出结果：obj 对象的 value 组成的数组['1','zhangsan','18']

#### 第三种：使用 Object.getOwnPropertyNames(obj)

返回一个数组,包含对象自身的所有属性(不含 Symbol 属性,但是包括不可枚举属性).

```
const obj = {id:1,name:'zhangsan',age:18}Object.getOwnPropertyNames(obj).forEach(function(key){     console.log(key+ '---'+obj[key])})
```

![img](pic\1422714-20190103144056616-1990780382.png)

#### 第四种：使用 Reflect.ownKeys(obj)遍历

返回一个数组,包含对象自身的所有属性,不管属性名是 Symbol 或字符串,也不管是否可枚举.

```
var obj = {'0':'a','1':'b','2':'c'};Reflect.ownKeys(obj).forEach(function(key){	console.log(key,obj[key]);});
```

![4.jpg](https://imghtml.baoday.cn/upload/image/331/950/396/1565232870719388.jpg)

### js 判断数组中是否包含某个元素

#### 方法一：array.indexOf(item,start)：元素在数组中的位置,如果没与搜索到则返回 -1。 首次出现的位置

| 参数  | 描述                                                                                                                                  |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------- |
| item  | 必须。查找的元素。                                                                                                                    |
| start | 可选的整数参数。规定在数组中开始检索的位置。它的合法取值是 0 到 stringObject.length - 1。如省略该参数，则将从字符串的首字符开始检索。 |

实际用法：if(arr.indexOf(某元素) > -1){//则包含该元素}

```
var fruits = ["Banana", "Orange", "Apple", "Mango"];var a = fruits.indexOf("Apple"); // 2//以上输出结果意味着 "Apple" 元素位于数组中的第 3 个位置。var fruits=["Banana","Orange","Apple","Mango","Banana","Orange","Apple"];var a = fruits.indexOf("Apple",4); //6//以上输出结果意味在数组的第四个位置开始检索：
```

#### 方法二：array.find()

数组实例的 find()用于找出第一个符合条件的数组元素。它的参数是一个回调函数，所有数组元素依次遍历该回调函数，直到找出第一个返回值为 true 的元素，然后返回该元素，否则返回 undefined。

find() 方法返回通过测试（函数内判断）的数组的第一个元素的值。

find() 方法为数组中的每个元素都调用一次函数执行：

- 当数组中的元素在测试条件时返回 _true_ 时, find() 返回符合条件的元素，之后的值不会再调用执行函数。
- 如果没有符合条件的元素返回 undefined

**注意:** find() 对于空数组，函数是不会执行的。

**注意:** find() 并没有改变数组的原始值。

```
[1, 5, 10, 15].find(function(value, index, arr) {return value > 9;})// 10
```

#### 方法三：array.findIndex()

array.findIndex()和 array.find()十分类似，返回第一个符合条件的数组元素的位置，如果所有元素都不符合条件，则返回-1。
findIndex() 方法为数组中的每个元素都调用一次函数执行：

当数组中的元素在测试条件时返回 true 时, findIndex() 返回符合条件的元素的索引位置，之后的值不会再调用执行函数。
如果没有符合条件的元素返回 -1

注意: findIndex() 对于空数组，函数是不会执行的。
注意: findIndex() 并没有改变数组的原始值

```
var ages = [3, 10, 18, 20];function checkAdult(age) {    return age >= 18;}function myFunction() {    console.log(ages.findIndex(checkAdult)) ;}myFunction()//2
```

方法二和方法三，这两个方法都可以发现 NaN，弥补了方法一 IndexOf()的不足。

```
[NaN].2.dexOf(NaN)//-1[Na3..findIndex(y => Object.is(NaN, y))// 0
```

#### 方法四：for()循环

```
遍历数组，然后 if 判断var arr = [1, 5, 10, 15];//传统forfor(let i=0; i<arr.length; i++) {    if(arr[i] === 查找值) {        //则包含该元素    }}// for...offor(v of arr) {    if(v === 查找值) {        //则包含该元素    }}//forEacharr.forEach(v=>{    if(v === 查找值) {        //则包含该元素    }})
```

#### 方法六、include()方法：

arr.includes(searchElement)方法用来判断一个数组是否包含一个指定的值，如果是返回 true，否则 false。searchElement:必须。需要查找的元素值。

```
let site = ['runoob', 'google', 'taobao'];site.includes('runoob');// truesite.includes('baidu');// false
```

| 例子                       | 结果     |
| -------------------------- | -------- |
| [1, 2, 3].includes(2);     | //true   |
| [1, 2, 3].includes(4);     | // false |
| [1, 2, 3].includes(3, 3);  | // false |
| [1, 2, 3].includes(3, -1); | //true   |
| [1, 2, NaN].includes(NaN); | //true   |

arr.includes(searchElement, fromIndex).fromIndex:可选。从该索引处开始查找 searchElement。如果为负值，则按升序从 array.length + fromIndex 的索引开始搜索。默认为 0。

```
var arr = ['a', 'b', 'c'];注意：如果fromIndex 大于等于数组长度 ，则返回 false 。该数组不会被搜索arr.includes('c', 3);   //falsearr.includes('c', 100); // false注意：如果 fromIndex 为负值，计算出的索引将作为开始搜索searchElement的位置。如果计算出的索引小于 0，则整个数组都会被搜索。// 数组长度是3// fromIndex 是 -100// computed index 是 3 + (-100) = -97arr.includes('a', -100); // truearr.includes('b', -100); // truearr.includes('c', -100); // true
```

#### 方法七.Array some() 方法，类似于 filter()

some() 方法用于检测数组中的元素是否满足指定条件（函数提供）。

some() 方法会依次执行数组的每个元素：

如果有一个元素满足条件，则表达式返回 true , 剩余的元素不会再执行检测。
如果没有满足条件的元素，则返回 false。
注意： some() 不会对空数组进行检测。

注意： some() 不会改变原始数组。

```
var ages = [3, 10, 18, 20];function checkAdult(age) {    return age == 18;}function myFunction() {    console.log(ages.some(checkAdult));}myFunction()//true
```

### JS 判断对象是否为空对象的几种方法

1.将 json 对象转化为 json 字符串，再判断该字符串是否为"{}"

```
var data = {};var b = (JSON.stringify(data) == "{}");alert(b);//true
```

2.for in 循环判断

```
var obj = {};var b = function() {    for(var key in obj) {        return false;    }    return true;}alert(b());//true
```

3.jquery 的 isEmptyObject 方法

此方法是 jquery 将 2 方法(for in)进行封装，使用时需要依赖 jquery

```
var data = {};var b = $.isEmptyObject(data);alert(b);//true
```

4.Object.getOwnPropertyNames()方法

此方法是使用 Object 对象的 getOwnPropertyNames 方法，获取到对象中的属性名，存到一个数组中，返回数组对象，我们可以通过判断数组的 length 来判断此对象是否为空

注意：此方法不兼容 ie8，其余浏览器没有测试

```
var data = {};var arr = Object.getOwnPropertyNames(data);alert(arr.length == 0);//true
```

5.使用 ES6 的 Object.keys()方法

与 4 方法类似，是 ES6 的新方法, 返回值也是对象中属性名组成的数组

```
var data = {};var arr = Object.keys(data);alert(arr.length == 0);//true
```

### 数组用到的方法￥

#### 创建一个数组:

```js
var a = [3, 11, 8]; // [3,11,8];// 字面量方式:这个方法也是我们最常用的，在初始化数组的时候 相当方便var a = Array(3); // [,,] // 构造器var a = Array(3, 11, 8); // [ 3,11,8 ]
```

ES6 Array.of() 返回由所有参数值组成的数组

```js
let a = Array.of(3, 11, 8); // [3,11,8]let a = Array.of(3); // [3]
```

ES6 Array.from() 将类对象转为真正的数组

```js
let obj = { 0: "a", 1: "b", 2: "c", length: 3 };
let arr = Array.from(obj); // ['a','b','c'];let arr = Array.from("hello"); // ['h','e','l','l','o']let arr = Array.from(new Set(["a", "b"])); // ['a','b']
```

#### 改变原数组的方法(9 个):

```js
ES5: a.splice() /
  a.sort() /
  a.pop() /
  a.shift() /
  a.push() /
  a.unshift() /
  a.reverse();
ES6: a.copyWithin() / a.fill;
```

1.splice() 添加/删除数组元素,然后返回被删除的项目

```js
//eg1:删除元素let a = [1, 2, 3, 4, 5, 6, 7];let item = a.splice(0, 3); // [1,2,3]console.log(a); // [4,5,6,7]// 从数组下标0开始，删除3个元素
```

```js
// eg2: 删除并添加let a = [1, 2, 3, 4, 5, 6, 7];let item = a.splice(0, 3, "添加"); // [1,2,3]console.log(a); // ['添加',4,5,6,7]// 从数组下标0开始，删除3个元素，并添加元素'添加'
```

```js
//eg3: 不删除只添加:let a = [1, 2, 3, 4, 5, 6, 7];let item = a.splice(0, 0, "添加1", "添加2"); // [] 没有删除元素，返回空数组console.log(a); // ['添加1','添加2',1,2,3,4,5,6,7]
```

2.sort() 数组排序:对数组元素进行排序，并返回这个数组。

```js
var a = ["Banana", "Orange", "Apple", "Mango"];
a.sort(); // ["Apple","Banana","Mango","Orange"]var a = [10, 1, 3, 20, 25, 8];console.log(a.sort()); // [1,10,20,25,3,8];
```

sort 排序常见用法：

- 数组元素为数字的升序、降序:

```js
var array = [10, 1, 3, 4, 20, 4, 25, 8]; // 升序 a-b < 0   a将排到b的前面，按照a的大小来排序的array.sort(function (a, b) {  return a - b;});console.log(array); // [1,3,4,4,8,10,20,25];
```

3.pop() 删除一个数组中的最后的一个元素并且返回这个元素。

```js
let a = [1, 2, 3];
let item = a.pop(); // 3console.log(a); // [1,2]
```

4.shift() 删除数组的第一个元素并返回这个元素。

```js
let a = [1, 2, 3];
let item = a.shift(); // 1console.log(a); // [2,3]
```

5.push() 向数组的末尾添加元素并返回新的长度。

```js
let a = [1, 2, 3];
let item = a.push("末尾"); // 4console.log(a); // [1,2,3,'末尾']
```

6.unshift()可向数组的开头添加一个或更多元素，并返回新的长度。

```js
let a = [1, 2, 3];
let item = a.unshift("开头"); // 4console.log(a); // ['开头',1,2,3]
```

7.reverse() 颠倒数组中元素的顺序

```js
let a = [1, 2, 3];
a.reverse();
console.log(a); // [3,2,1]
```

8.ES6: copyWithin() 指定位置的成员复制到其他位置并返回这个数组。

```js
var a = [
  "OB1",
  "Koro1",
  "OB2",
  "Koro2",
  "OB3",
  "Koro3",
  "OB4",
  "Koro4",
  "OB5",
  "Koro5",
]; // 2位置开始被替换,3位置开始读取要替换的 5位置前面停止替换a.copyWithin(2, 3, 5);// ["OB1","Koro1","Koro2","OB3","OB3","Koro3","OB4","Koro4","OB5","Koro5"]
```

9.ES6: fill() 填充数组

```js
["a", "b", "c"].fill(7)[  // [7, 7, 7]  ("a", "b", "c")].fill(7, 1, 2);// ['a', 7, 'c']
```

#### 不改变原数组的方法(8 个):

```js
    ES5：slice、join、toLocaleString、toString、cancat、indexOf、lastIndexOf、    ES7：includes
```

1.slice()返回一个从开始到结束（不包括结束）的数组的一部分浅拷贝到一个新数组对象

```js
let a = [{ name: "OBKoro1" }];
let b = a.slice();
console.log(b, a); // [{"name":"OBKoro1"}]  [{"name":"OBKoro1"}]a[0].name = "改变原数组"; //console.log(b,a);//[{"name":"改变原数组"}] [{"name":"改变原数组"}]
```

2.join() 数组转字符串

```js
let a = ["hello", "world"];
let str = a.join(); // 'hello,world'let str2 = a.join("+"); // 'hello+world'
```

3.toLocaleString() 数组转字符串

```js
let a = [{ name: "OBKoro1" }, 23, "abcd", new Date()];
let str = a.toLocaleString(); // [object Object],23,abcd,2018/5/28 下午1:52:20
```

4.toString() 数组转字符串 不推荐

```js
let b = ["toString", "演示"].toString(); // toString,演示let a = ["调用toString", "连接在我后面"] + "啦啦啦"; // 调用toString,连接在我后面啦啦啦
```

5.cancat()方法用于合并两个或多个数组，返回一个新数组。

```js
let a = [1, 2, 3];
let b = [4, 5, 6]; //连接两个数组let newVal = a.concat(b); // [1,2,3,4,5,6]
```

ES6 扩展运算符`...`合并数组：

```js
let a = [2, 3, 4, 5];
let b = [4, ...a, 4, 4];
console.log(a, b); //  [2, 3, 4, 5] [4,2,3,4,5,4,4]
```

6.indexOf() 返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。

```js
let a = ["啦啦", 2, 4, 24];
console.log(a.indexOf("啦")); // -1console.log(a.indexOf("啦啦")); // 0
```

7.lastIndexOf() 查找指定元素在数组中的最后一个位置

```js
let a = ["OB", 4, "Koro1", 1, 2, "Koro1", 3, 4, 5, "Koro1"]; // 数组长度为10// let b=a.lastIndexOf('Koro1',4); // 从下标4开始往前找 返回下标2
```

8.ES7 includes() 查找数组是否包含某个元素 返回布尔

```js
let a = ["OB", "Koro1", 1, NaN]; // let b=a.includes('Koro1',-3);  // true 从倒数第三个元素开始搜索
```

#### 遍历方法(12 个):

js 中遍历数组并不会改变原始数组的方法总共有 12 个:

```js
    ES5：forEach、every 、some、 filter、map、reduce、reduceRight、    ES6：find、findIndex、keys、values、entries
```

1.forEach

```js
let a = [1, 2, , 3]; // 最后第二个元素是空的，不会遍历(undefined、null会遍历)let obj = { name: "OBKoro1" };let result = a.forEach(function (value, index, array) {  a[3] = "改变元素";  a.push("添加到尾端，不会被遍历");  console.log(value, "forEach传递的第一个参数"); // 分别打印 1 ,2 ,改变元素  console.log(this.name); // OBKoro1 打印三次 this绑定在obj对象上  // break; // break会报错 不能continue跳过或者break终止循环  return value; // return只能结束本次回调 会执行下次回调  console.log("不会执行，因为return 会执行下一次循环回调");}, obj);console.log(result); // 即使return了一个值,总是返回 undefined值
```

推荐在循环对象属性的时候使用 for in,在遍历数组的时候的时候使用 for of；for in`总是得到对象的`key 或数组、字符串的下标；`for of`总是得到对象的`value`或数组、字符串的值；for of 是 ES6 新引入的特性。修复了 ES5 的 for in 的不足；for of 不能循环普通的对象，需要通过和 Object.keys()搭配使用。

2.every 检测数组所有元素是否都符合判断条件

```js
[12, 5, 8, 130, 44].every((x) => x >= 10); // false
```

3.some 数组中的是否有满足判断条件的元素

```js
function isBigEnough(element, index, array) {
  return element >= 10;
}
let result = [2, 5, 8, 1, 4].some(isBigEnough); // false
```

4.filter 过滤原始数组，返回新数组(不改变原数组)

```js
let a = [32, 33, 16, 40];
let result = a.filter(function (value, index, array) {
  return value >= 18;
});
console.log(result, a); // [32,33,40] [32,33,16,40]
```

5.map 对数组中的每个元素进行处理，返回新的数组(不改变原数组)

```js
let nums = [1, 2, 3];let obj = { val: 5 };let newNums = nums.map(function (item, index, array) {  return item + index + array[index] + this.val;  //第一个元素，1 + 0 + 1 + 5 = 7 第二个2 + 1 + 2 + 5 = 10 第三个3 + 2 + 3 + 5 = 13}, obj);console.log(newNums); //[7, 10, 13]
```

6.reduce 为数组提供累加器，合并为一个值

- 参数: 接收两个参数，一个为回调函数，另一个为初始值。回调函数中四个默认参数，依次为积累值、当前值、当前索引和整个数组。

```js
let nums = [1, 2, 3];
let newNums = nums.reduce(function (preSum, curVal, currentIndex, array) {
  return preSum + curVal;
}, 0);
console.log(newNums); //6
```

7.reduceRight 从右至左累加

这个方法除了与 reduce 执行方向相反外，其他完全与其一致，请参考上述 reduce 方法介绍。

8.ES6：find()& findIndex() 根据条件找到数组成员

```js
let a = [1, 4, -5, 10].find((n) => n < 0); // 返回元素-5let a = [1, 4, -5, 10].findIndex((n) => n < 0); // 返回索引2
```

9.ES6 keys()&values()&entries() 遍历键名、遍历键值、遍历键名+键值

```js
    for (let index of ['a', 'b'].keys()) {console.log(index)//0 1 }    for (let elem of ['a', 'b'].values()) {console.log(elem);//'a' 'b' }    for (let [index, elem] of ['a', 'b'].entries()) {      console.log(index, elem); // 0 "a"  1 "b"    }
```

在`for..of`中如果遍历中途要退出，可以使用`break`退出循环。

#### 函数的 arguments 如何转化成数组？

1. Array.prototype.slice.call()

```js
function sum(a, b) {  let args = Array.prototype.slice.call(arguments);  console.log(args.reduce((sum, cur) => sum + cur)); //args可以调用数组原生的方法啦}sum(1, 2); //3
```

2.Array.from()

```js
function sum(a, b) {  let args = Array.from(arguments);  console.log(args.reduce((sum, cur) => sum + cur)); //args可以调用数组原生的方法啦}sum(1, 2); //3
```

3. ES6 展开运算符

```js
function sum(a, b) {  let args = [...arguments];  console.log(args.reduce((sum, cur) => sum + cur)); //args可以调用数组原生的方法啦}sum(1, 2); //3
```

4. 利用 concat+apply

```js
function sum(a, b) {  let args = Array.prototype.concat.apply([], arguments); //apply方法会把第二个参数展开  console.log(args.reduce((sum, cur) => sum + cur)); //args可以调用数组原生的方法啦}sum(1, 2); //3
```

当然，最原始的方法就是再创建一个数组，用 for 循环把类数组的每个属性值放在里面，过于简单，就不浪费篇幅了。

#### forEach 中 return 有效果吗？如何中断 forEach 循环？

在 forEach 中用 return 不会返回，函数会继续执行。

```js
let nums = [1, 2, 3];
nums.forEach((item, index) => {
  return;
}); //无效
```

中断方法：

1. 使用 try 监视代码块，在需要中断的地方抛出异常。
2. 官方推荐方法（替换方法）：用 every 和 some 替代 forEach 函数。every 在碰到 return false 的时候，中止循环。some 在碰到 return true 的时候，中止循环

#### JS 中 flat---数组扁平化

需求:多维数组=>一维数组

```js
let ary = [1, [2, [3, [4, 5]]], 6]; // -> [1, 2, 3, 4, 5, 6]
```

1. 调用 ES6 中的 flat 方法

```js
ary = ary.flat(Infinity);
```

2. replace + split

```js
ary = str.replace(/(\[|\])/g, "").split(",");
```

3. replace + JSON.parse

```js
str = str.replace(/(\[|\])/g, "");
str = "[" + str + "]";
ary = JSON.parse(str);
```

4. 普通递归

```js
let result = [];
let fn = function (ary) {
  for (let i = 0; i < ary.length; i++) {
    let item = ary[i];
    if (Array.isArray(ary[i])) {
      fn(item);
    } else {
      result.push(item);
    }
  }
};
```

5. 利用 reduce 函数迭代

```js
function flatten(ary) {
  return ary.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? flatten(cur) : cur);
  }, []);
}
```

6：扩展运算符

```js
//只要有一个元素有数组，那么循环继续while (ary.some(Array.isArray)) {  ary = [].concat(...ary);}
```

#### 数组去重

双层 for 循环

```javascript
function distinct(arr) {  for (let i = 0, len = arr.length; i < len; i++) {    for (let j = i + 1; j < len; j++) {      if (arr[i] == arr[j]) {        arr.splice(j, 1);        // splice 会改变数组长度，所以要将数组长度 len 和下标 j 减一        len--;        j--;      }    }  }  return arr;}
```

使用`indexof`方法和新数组

```js
//使用indexoffunction unique(arr) {  var array = []; //用新数组来装  for (let i = 0; i < arr.length; i++) {    if (array.indexOf(arr[i]) === -1) {      //indexof返回-1表示在新数组中不存在该元素      array.push(arr[i]); //是新数组里没有的元素就push入    }  }  return array;}
```

使用`includes`也可以判断是否含有某值

```js
function unique(arr) {  var array = [];  for (var i = 0; i < arr.length; i++) {    if (!array.includes(arr[i])) {      //includes 检测数组是否有某个值      array.push(arr[i]);    }  }  return array;}
```

使用 sort 方法先排序，使相同的元素都相邻

```js
function unique(arr) {  arr = arr.sort((a, b) => a - b); //sort先按从小到大排序  var arrry = [arr[0]];  for (var i = 1; i < arr.length; i++) {    if (arr[i] !== arr[i - 1]) {      arrry.push(arr[i]);    }  }  return arrry;}
```

ES6 中的 Set 去重

```javascript
function distinct(array) {
  return Array.from(new Set(array));
}
```

甚至可以再简化下：

```javascript
function unique(array) {
  return [...new Set(array)];
}
```

还可以再简化下：

```javascript
let unique = (a) => [...new Set(a)];
```

使用 Map

```js
function unique(arr) {  let map = new Map();  let array = new Array(); // 数组用于返回结果  for (let i = 0; i < arr.length; i++) {    if (map.has(arr[i])) {      // 如果有该key值      map.set(arr[i], true);    } else {      map.set(arr[i], false); // 如果没有该key值      array.push(arr[i]);    }  }  return array;}
```

Map 对象保存键值对，并且能够记住键的原始插入顺序。任何值(对象或者原始值) 都可以作为一个键或一个值。

- `Map.prototype.has(key)` 返回一个布尔值，表示 Map 实例是否包含键对应的值。
- `Map.prototype.set(key, value)` 设置 Map 对象中键的值。返回该 Map 对象。

使用 filter

```js
function unique(arr) {  return arr.filter(function (item, index, arr) {    //当前元素，在原始数组中的第一个索引==当前索引值，否则返回当前元素    //不是那么就证明是重复项，就舍弃    return arr.indexOf(item) === index;  });}
```

使用 reduce 加 includes

```js
function unique(arr) {  let result = arr.reduce((acc, cur) => {    if (!acc.includes(cur)) {      acc.push(cur);    }    return acc;  }, []); //[]作为回调函数的第一个参数的初始值  return result;}
```

### 如何通过 JS 判断⼀个数组

- instanceof ⽅法
  - instanceof 运算符是⽤来测试⼀个对象是否在其原型链原型构造函数的属性

```
    let arr = [];    arr instanceof Array; // true
```

- constructor ⽅法
  - constructor 属性返回对创建此对象的数组函数的引⽤，就是返回对象相对应的构造 函数

```
    let arr = [];    arr.constructor == Array; //true
```

- 最简单的⽅法 这种写法，是 jQuery 正在使⽤的

```
    Object.prototype.toString.call(value) == '[object Array]'    // 利⽤这个⽅法，可以写⼀个返回数据类型的⽅法    let isType = function (obj) {    return Object.prototype.toString.call(obj).slice(8,-1); }
```

- ES5 新增⽅法 isArray()

```
    let a = new Array(123);    let b = new Date();    console.log(Array.isArray(a)); //true    console.log(Array.isArray(b)); //false
```

### JS 数组和对象的遍历⽅式，以及⼏种⽅式的⽐较

- for in 循环
- for 循环
- forEach
  - 这⾥的 forEach 回调中两个参数分别为 value ， index
  - forEach ⽆法遍历对象 IE 不⽀持该⽅法； Firefox 和 chrome ⽀持
  - forEach ⽆法使⽤ break ， continue 跳出循环，且使⽤ return 是跳过本次循 环
- 这两种⽅法应该⾮常常⻅且使⽤很频繁。但实际上，这两种⽅法都存在性能问题
- 在⽅式⼀中， for-in 需要分析出 array 的每个属性，这个操作性能开销很⼤。⽤在 key 已知的数组上是⾮常不划算的。所以尽量不要⽤ for-in ，除⾮你不清楚要处理哪 些属性，例如 JSON 对象这样的情况
- 在⽅式 2 中，循环每进⾏⼀次，就要检查⼀下数组⻓度。读取属性（数组⻓度）要⽐读局部 变量慢，尤其是当 array ⾥存放的都是 DOM 元素，因为每次读取都会扫描⼀遍⻚⾯上 的选择器相关元素，速度会⼤⼤降低

### 数组去重⽅法总结

**⽅法⼀、利⽤ ES6 Set 去重（ES6 中最常⽤)**

```
    function unique (arr) {    return Array.from(new Set(arr)) }    var arr = [1,2,3,4,5,,5,4,3,2,1]    console.log(unique(arr))    //[1, 2, 3, 4, 5]
```

**⽅法⼆、利⽤ for 嵌套 for，然后 splice 去重（ES5 中最常⽤）**

> 双层循环，外层循环元素，内层循环时⽐较值。值相同时，则删去这个值。

```
    function unique(arr){        for(var i=0; i<arr.length; i++){            for(var j=i+1; j<arr.length; j++){                if(arr[i]==arr[j]){ //第⼀个等同于第⼆个，splice⽅法删除                     arr.splice(j,1);                     j--;                }            }        }        return arr;    }
```

**⽅法三、利⽤ indexOf 去重**

> 新建⼀个空的结果数组， for 循环原数组，判断结果数组是否存在当前元 素，如果有相同的值则跳过，不相同则 push 进数组

```
    function unique(arr) {        if (!Array.isArray(arr)) {         console.log('type error!')         return        }        var array = [];        for (var i = 0; i < arr.length; i++) {            if (array .indexOf(arr[i]) === -1) {             array .push(arr[i])            }        }         return array;    }
```

**⽅法四、利⽤ sort()**

> 利⽤ sort() 排序⽅法，然后根据排序后的结果进⾏遍历及相邻元素⽐对

```
    function unique(arr) {        if (!Array.isArray(arr)) {          console.log('type error!')          return;        }         arr = arr.sort()        var arrry= [arr[0]];        for (var i = 1; i < arr.length; i++) {            if (arr[i] !== arr[i-1]) {             arrry.push(arr[i]); }        }        return arrry;    }
```

**⽅法五、利⽤对象的属性不能相同的特点进⾏去重**

```
    function unique(arr) {        if (!Array.isArray(arr)) {            console.log('type error!')            return        }        var arrry= [];        var obj = {};        for (var i = 0; i < arr.length; i++) {            if (!obj[arr[i]]) {             arrry.push(arr[i])             obj[arr[i]] = 1 } else {             obj[arr[i]]++            }        }        return arrry;    }
```

**⽅法六、利⽤ includes**

```
    function unique(arr) {        if (!Array.isArray(arr)) {             console.log('type error!')             return        }        var array =[];        for(var i = 0; i < arr.length; i++) {        if( !array.includes( arr[i]) ) {//includes 检测数组是否有某个值            array.push(arr[i]); }        }        return array    }
```

**⽅法七、利⽤ hasOwnProperty**

> 利⽤ hasOwnProperty 判断是否存在对象属性

```
    function unique(arr) {        var obj = {};        return arr.filter(function(item, index, arr){        return obj.hasOwnProperty(typeof item + item) ? false : (obj[typeof        })    }
```

**⽅法⼋、利⽤ filter**

```
    function unique(arr) {        return arr.filter(function(item, index, arr) {        //当前元素，在原始数组中的第⼀个索引==当前索引值，否则返回当前元素        return arr.indexOf(item, 0) === index; });    }
```

**⽅法九、利⽤递归去重**

```
    function unique(arr) {        var array= arr;        var len = array.length;        array.sort(function(a,b){ //排序后更加⽅便去重            return a - b;        })        function loop(index){            if(index >= 1){                if(array[index] === array[index-1]){                 array.splice(index,1); }                loop(index - 1); //递归loop，然后数组去重              }            }        loop(len-1);        return array;    }
```

**⽅法⼗、利⽤ Map 数据结构去重**

> 创建⼀个空 Map 数据结构，遍历需要去重的数组，把数组的每⼀个元素作为 key 存到 Map 中。由于 Map 中不会出现相同的 key 值，所以最终得到的就 是去重后的结果

```
    function arrayNonRepeatfy(arr) {        let map = new Map();        let array = new Array(); // 数组⽤于返回结果        for (let i = 0; i < arr.length; i++) {            if(map .has(arr[i])) { // 如果有该key值                map .set(arr[i], true);            } else {                map .set(arr[i], false); // 如果没有该key值                array .push(arr[i]);            }        }        return array ;    }
```

**⽅法⼗⼀、利⽤ reduce+includes**

```
    function unique(arr){        return arr.reduce((prev,cur) => prev.includes(cur) ? prev : [...prev,cu    }
```

**⽅法⼗⼆、[...new Set(arr)]**

```
    [...new Set(arr)]    //代码就是这么少----（其实，严格来说并不算是⼀种，相对于第⼀种⽅法来说只是简化了代码）
```

### JavaScript 循环大总结， for, forEach，for in，for of, map 区别

#### map（数组方法）：

**特性：**

1. map 不改变原数组但是会返回新数组
2. 可以使用 break 中断循环，可以使用 return 返回到外层函数

```let
let newarr=arr.map(i=>{	return i+=1;	console.log(i);})console.log(arr)//1,3,4---不会改变原数组console.log(newarr)//[2,4,5]---返回新数组
```

#### forEach（数组方法）：

**特性：**

1. 便利的时候更加简洁，效率和 for 循环相同，不用关心集合下标的问题，减少了出错的概率。
2. 没有返回值
3. 不能使用 break 中断循环，不能使用 return 返回到外层函数

```let
let newarr=arr.forEach(i=>{	i+=1;	console.log(i);//2,4,5})console.log(arr)//[1,3,4]console.log(newarr)//undefined
```

**注意：**

1. forEach() 对于空数组是不会执行回调函数的。
2. for 可以用 continue 跳过循环中的一个迭代，forEach 用 continue 会报错。
3. forEach() 需要用 return 跳过循环中的一个迭代，跳过之后会执行下一个迭代。

#### for in(大部分用于对象)：详细见 es6 for in for of 区别

用于循环遍历数组或对象属性

**特性：**

可以遍历数组的键名，遍历对象简洁方便

```//首先遍历对象
   let person={name:"小白",age:28,city:"北京"}   let text=""   for (let i in person){      text+=person[i]   }  // 输出结果为：小白28北京  //其次在尝试一些数组   let arry=[1,2,3,4,5]   for (let i in arry){        console.log(arry[i])    } //能输出出来，证明也是可以的
```

#### for of（不能遍历对象）：详细见 es6 for in for of 区别

**特性：**

1. （可遍历 map，object,array,set string 等）用来遍历数据，比如组中的值
2. 避免了 for in 的所有缺点，可以使用 break,continue 和 return，不仅支持数组的遍历，还可以遍历类似数组的对象。

```//遍历数组
   let arr=["nick","freddy","mike","james"];    for (let item of arr){        console.log(item)    }//结果为nice freddy mike james//遍历对象   let person={name:"老王",age:23,city:"唐山"}   for (let item of person){        console.log(item)    }//我们发现它是不可以的//但是它和forEach有个解决方法，结尾介绍
```

#### 总结：

- forEach 遍历列表值,不能使用 break 语句或使用 return 语句
- for in 遍历对象键值(key),或者数组下标,不推荐循环一个数组
- for of 遍历列表值,允许遍历 Arrays（数组）, Strings（字符串）, Maps（映射）, Sets（集合）等可迭代的数据结构等.在 ES6 中引入的 for of 循环，以替代 for in 和 forEach() ，并支持新的迭代协议。
- for in 循环出的是 key，for of 循环出的是 value；
- for of 是 ES6 新引入的特性。修复了 ES5 的 for in 的不足；
- for of 不能循环普通的对象，需要通过和 Object.keys()搭配使用

### es6 新特性￥￥￥￥￥￥

#### let/const（常用）

**暂时性死区**

虽然变量还没有被声明，但是我们却可以使用这个未被声明的变量，这种情况就叫做提升。剖析暂时性死区的原理，**其实 let/const 同样也有提升的作用**，但是和 var 的区别在于

- var 在创建时就被初始化，并且赋值为 undefined

- let/const 在进入块级作用域后，会因为提升的原因先创建，但不会被初始化，直到声明语句执行的时候才被初始化，初始化的时候如果使用 let 声明的变量没有赋值，则会默认赋值为 undefined，而 const 必须在初始化的时候赋值。而创建到初始化之间的代码片段就形成了暂时性死区

- `var` 存在提升，我们能在声明之前使用。`let`、`const` 因为暂时性死区的原因，不能在声明前使用；`var` 在全局作用域下声明变量会导致变量挂载在 `window` 上，其他两者不会；`let` 和 `const` 作用基本一致，但是后者声明的变量不能再次赋值

  ```
  console.log(a)let a
  ```

  ![img](pic\format,png)

- 函数提升优先于变量提升，函数提升会把整个函数挪到作用域顶部，变量提升只会把声明挪到作用域顶部

#### 箭头函数（常用）

箭头函数的 this 继承的是外层代码块的 this，箭头函数对于使用 function 关键字创建的函数有以下区别

1. 箭头函数没有 arguments（使用剩余运算符替代）
2. 箭头函数没有 prototype 属性，不能用作构造函数（不能用 new 关键字调用）
3. 箭头函数没有自己 this，在你写这行代码的时候就箭头函数的 this 就已经和外层执行上下文的 this 绑定了。箭头函数的 this 指向即使使用 call,apply,bind 也无法改变

#### 谈⼀谈箭头函数与普通函数的区别？

- 函数体内的 this 对象，就是定义时所在的对象，⽽不是使⽤时所在的对象
- 不可以当作构造函数，也就是说，不可以使⽤ new 命令，否则会抛出⼀个错误
- 不可以使⽤ arguments 对象，该对象在函数体内不存在。如果要⽤，可以⽤ Rest 参数 代替
- 不可以使⽤ yield 命令，因此箭头函数不能⽤作 Generator 函数

#### 剩余/扩展运算符（常用）

剩余/扩展运算符同样也是 ES6 一个非常重要的语法，使用 3 个点（...）

##### **扩展运算符**

##### ![img](pic\20190424171724277.png)

##### **剩余运算符**

剩余运算符最重要的一个特点就是替代了以前的 arguments。箭头函数没有 arguments，必须使用剩余运算符才能访问参数集合

![img](pic\watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMxOTY1NTE1,size_16,color_FFFFFF,t_70.png)

剩余运算符可以和数组的解构赋值一起使用，但是必须放在**最后一个**，因为剩余运算符的原理其实是利用了数组的迭代器

![img](pic\watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMxOTY1NTE1,size_16,color_FFFFFF,t_70.png)

这里 first 会消耗右边数组的一个迭代器，...arr 会消耗剩余所有的迭代器，而第二个例子...arr 直接消耗了所有迭代器，导致 last 没有迭代器可供消耗了，所以会报错，剩余运算符和扩展运算符的区别就是，剩余运算符会收集这些集合，放到右边的数组中，扩展运算符是将右边的数组拆分成元素的集合，它们是相反的

#### 解构赋值（常用）

使用 axios 的响应结果进行解构(axios 默认会把真正的响应结果放在 data 属性中)

![img](pic\20190424171714723.png)

你如何不借助第三个变量交换两个变量的值？

```js
var a = 1;
var b = ((2)[(a, b)] = [b, a]); // 解构赋值
```

#### 对象属性/方法简写(常用)

**对象属性简写**

es6 允许当对象的属性和值相同时，省略属性名![img](pic\20190425092625832.png)

**方法简写**

es6 允许当一个对象的属性的值是一个函数（即是一个方法），可以使用简写的形式![img](pic\20190425092651526.png)

#### for ... of 循环

for ... of 是作为 ES6 新增的遍历方式,和 for ... in 的区别如下

1. for ... of 只能用在可迭代对象上,获取的是迭代器返回的 value 值,for ... in 可以获取所有对象的键名
2. for ... in 会遍历对象的整个原型链,性能非常差不推荐使用,而 for ... of 只遍历当前对象不会遍历它的原型链
3. 对于数组的遍历,for ... in 会返回数组中所有可枚举的属性(包括原型链上可枚举的属性),for ... of 只返回数组的下标对应的属性值

#### JS 中的 Symbol 是什么？

见 js symbol

#### Promise（常用）

见 js Promise

#### ES6 Module(常用)

AMD,CMD 和 CommonJs 这 3 种模块化方案，前者用在浏览器端，后面 2 种用在服务端，直到 ES6 Module 出现。**ES6 Module 默认目前还没有被浏览器支持，需要使用 babel，在日常写 demo 的时候经常会显示这个错误**![img](pic\2019042509294579.png)

ES6 Module 使用 import 关键字导入模块，export 关键字导出模块

module.js 导出:

![img](pic\20190425093004565.png)

a.js 导入:

![img](pic\20190425093013423.png)

这两者的区别是，export {<变量>}导出的是一个变量的引用，export default 导出的是一个值。就是说在 a.js 中使用 import 导入这 2 个变量的后，在 module.js 中因为某些原因 x 变量被改变了，那么会立刻反映到 a.js，而 module.js 中的 y 变量改变后，a.js 中的 y 还是原来的值

这里再来说一下目前为止主流的模块化方案 ES6 Module 和 CommonJs 的一些区别

1. CommonJs 输出的是一个值的拷贝,ES6 Module 通过 export {<变量>}输出的是一个变量的引用,export default 输出的是一个值
2. CommonJs 运行在服务器上,被设计为运行时加载,即代码执行到那一行才回去加载模块,而 ES6 Module 是静态的输出一个接口,发生在编译的阶段
3. CommonJs 在第一次加载的时候运行一次并且会生成一个缓存,之后加载返回的都是缓存中的内容

**import()**

关于 ES6 Module 静态编译的特点,导致了无法动态加载,但是总是会有一些需要动态加载模块的需求,所以现在有一个提案,使用把 import 作为一个函数可以实现动态加载模块,它返回一个 Promise,Promise 被 resolve 时的值为输出的模块
![img](pic\watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMxOTY1NTE1,size_16,color_FFFFFF,t_70.png)

![img](pic\20190425093118496.png)

使用 import 方法改写上面的 a.js 使得它可以动态加载(使用静态编译的 ES6 Module 放在条件语句会报错,因为会有提升的效果,并且也是不允许的),可以看到输出了 module.js 的一个变量 x 和一个默认输出

Vue 中路由的懒加载的 ES6 写法就是使用了这个技术,使得在路由切换的时候能够动态的加载组件渲染视图

#### 函数默认值

ES5 写法:

![img](pic\20190425093128694.png)

ES6 写法:

![img](pic\20190425093138195.png)

如果使用了函数默认参数,在函数的参数的区域(括号里面),它会作为一个单独的**块级作用域**,并且拥有 let/const 方法的一些特性,比如暂时性死区![img](pic\20190425093147280.png)

#### set 和 map 区别？

> 1. set
>    1. es6 提供的一种新的数据结构，它类似于数组，但是成员的值都是唯一的
>    2. set 用于数据重组，成员不能重复，只有键值，没有键名
> 2. map
>    1. es6 提供的一种新的数据结构，它类似于对象，也是键值对的集合，但是键的范围不仅限于字符串，各种类型的值都可以当做键
>    2. map 用于数据储存，本质是键值对的集合

#### Proxy

Proxy 作为一个"拦截器",可以在目标对象前架设一个拦截器,他人访问对象,必须先经过这层拦截器,Proxy 同样是一个构造函数,使用 new 关键字生成一个拦截对象的实例,ES6 提供了非常多对象拦截的操作,几乎覆盖了所有可能修改目标对象的情况(Proxy 一般和 Reflect 配套使用,前者拦截对象,后者返回拦截的结果,Proxy 上有的的拦截方法 Reflect 都有)

![img](pic\watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMxOTY1NTE1,size_16,color_FFFFFF,t_70.png)

##### Object.definePropery

属性描述符有 configurable,writable,enumerable,value 这 4 个属性,分别代表是否可配置,是否只读,是否可枚举和属性的值,访问器有 configurable,enumerable,get,set,前 2 个和属性描述符功能相同,后 2 个都是函数,定义了 get,set 后对元素的读写操作都会执行后面的 getter/setter 函数,并且覆盖默认的读写行为

![img](pic\watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMxOTY1NTE1,size_16,color_FFFFFF,t_70.png)

定义了 obj 中 a 属性的表示为只读,且不可枚举,obj2 定义了 get,但没有定义 set 表示只读,并且读取 obj2 的 b 属性返回的值是 getter 函数的返回值

##### **Vue**

尤大预计 2019 年下半年发布 Vue3.0,其中一个核心的功能就是使用 Proxy 替代 Object.defineProperty

我相信了解过一点 Vue 响应式原理的人都知道 Vue 框架在对象拦截上的一些不足

```
<template>   <div>       <div>{{arr}}</div>       <div>{{obj}}</div>       <button @click="handleClick">修改arr下标</button>       <button @click="handleClick2">创建obj的属性</button>   </div></template><script>    export default {        name: "index",        data() {            return {                arr:[1,2,3],                obj:{                    a:1,                    b:2                }            }        },        methods: {            handleClick() {                this.arr[0] = 10                console.log(this.arr)            },            handleClick2() {                this.obj.c = 3                console.log(this.obj)            }        },   }</script>
```

可以看到这里数据改变了,控制台打印出了新的值,但是视图没有更新,这是因为 Vue 内部使用 Object.defineProperty 进行的数据劫持,而这个 API 无法探测到**对象根属性的添加和删除,以及直接给数组下标进行赋值**,所以不会通知渲染 watcher 进行视图更新,而理论上这个 API 也无法探测到数组的一系列方法(push,splice,pop),但是 Vue 框架修改了数组的原型,使得在调用这些方法修改数据后会执行视图更新的操作

#### Object.assign

这个 ES6 新增的 Object 静态方法允许我们进行多个对象的合并![img](pic\20190425093429640.png)

1. Object.assign 是浅拷贝,对于值是引用类型的属性,拷贝仍旧的是它的引用
2. 可以拷贝 Symbol 属性
3. 不能拷贝不可枚举的属性
4. Object.assign 保证 target 始终是一个对象,如果传入一个基本类型,会转为基本包装类型,null/undefined 没有基本包装类型,所以传入会报错

### 高阶函数和回调函数？

> 1. 高阶函数：
>    1. 输入参数中有函数
>    2. 返回值是函数
> 2. 回调函数：
>    1. 自己定义，但是由别人调用的函数
> 3. 函数 A 接受的参数为函数 B 的时候，函数 A 为高阶函数，函数 B 为回调函数

### 引入 js 文件，在 body 里和 head 区别？在 head 里引入 js 文件能获取 DOM 吗？不能的话，我想在 head 里获取到 DOM 怎么做？

> 1. 放到<head>中的情况：脚本会优先加载，但加载过程中，<body>还没加载完，会使脚本访问不到<body>元素
> 2. 放<body>底部，脚本在<body>加载后加载，能够保证脚本有效的访问<body>元素

### 什么是事件代理

- 事件代理（ Event Delegation ），⼜称之为事件委托。是 JavaScript 中绑定事件的常⽤技巧。顾名思义，“事件代理”即是把原本需要绑定的事件委托给⽗元素，让⽗元素担当事件监听的职务。事件代理的原理是 DOM 元素的事件冒泡。
  当一个 HTML 元素产生一个事件时，该事件会按特定的顺序传播，路径所经过的节点都会收到该事件，这个传播过程称为事件流。事件流都会经过三个阶段：捕获阶段 -> 目标阶段 -> 冒泡阶段，而事件委托就是在冒泡阶段完成.事件委托（代理），就是把一个元素响应事件（click、keydown......）的函数委托到它的父层或者更外层元素上，当事件响应到目标元素上时，会通过冒泡机制从而触发它的外层元素的绑定事件，然后在外层元素上去执行函数，真正绑定事件的是外层元素，而不是目标元素<img src="pic\eventFlow.png" alt="事件流" style="zoom: 50%;" />

如果我们有一个列表，列表之中有大量的列表项，我们需要在点击列表项的时候响应一个事件，如果给每个列表项一一都绑定一个函数，那对于内存消耗是非常大的，这时候就可以事件委托，把点击事件绑定在父级元素 ul 上面，然后执行事件的时候再去匹配目标元素
addEventListener 的第三个参数设置为 true 和 false 的区别已经⾮常清晰了

- true 表示该元素在事件的“捕获阶段”（由外往内传递时）响应事件
- false 表示该元素在事件的“冒泡阶段”（由内向外传递时）响应事件

- 使⽤事件代理的好处是：
  - 可以提⾼性能
  - 可以⼤量节省内存占⽤
  - 减少事件注册，⽐如在 table 上代理所有 td 的 click 事件

### script 标签中 defer 和 async 的区别

defer：脚本的加载过程和文档加载是异步发生的，script 被异步加载后并不会⽴刻执⾏，⽽是等待⽂档被解析完毕后执 行。

async：同样是异步加载脚本，脚本的加载过程和文档加载也是异步发生的。但脚本下载完成后会停止 HTML 解析，执行脚本，脚本解析完继续 HTML 解析。

<img src="pic\20210420104400904.png" alt="在这里插入图片描述" style="zoom: 80%;" />

> 蓝⾊线代表脚本的加载过程，红⾊线代表脚本的执⾏时间，绿⾊线代表 HTML 解析

### 什么是⾯向对象编程和⾯向过程编程

- ⾯向过程就是分析出解决问题所需要的步骤，然后⽤函数把这些步骤⼀步⼀步实现，使⽤的时候⼀个⼀个依次调⽤就可以了
- ⾯向对象是把构成问题事务分解成各个对象，建⽴对象的⽬的不是为了完成⼀个步骤，⽽是为了描叙某个事物在整个解决问题的步骤中的⾏为 ⾯向对象是以功能来划分问题，⽽不是步骤

### ⾯向对象编程思想

- 基本思想是使⽤对象，类，继承，封装等基本概念来进⾏程序设计
- 优点
  - 易维护 采⽤⾯向对象思想设计的结构，可读性⾼，由于继承的存在，即使改变需求，那么维 护也只是在局部模块，所以维护起来是⾮常⽅便和较低成本的
  - 易扩展
  - 开发⼯作的重⽤性、继承性⾼，降低重复⼯作量
  - 缩短了开发周期

### 执行上下文

当 JS 代码执行一段可执行代码时，就会进行准备工作（执行上下文）。因此在一个 JS 程序中，必定会产生多个执行上下文，每次函数调用 JS 引擎都会以栈的方式来处理它们，这个栈，我们称其为函数调用栈（执行上下文栈）。栈底永远都是全局上下文，而栈顶就是当前正在执行的上下文。

执行上下文分为三种：全局执行上下文；函数执行上下文；Eval 函数执行上下文

当 JS 代码执行一段可执行代码时，会创建对应的执行上下文。对于每个执行上下文，都有三个重要属性：

- 变量对象(Variable object，VO)
- 作用域链(Scope chain)
  - 当查找变量时，首先从当前上下文中的变量对象查找，如果没有就会往上查找父级作用域中的变量对象，最终找到全局上下文的变量对象，如果没有就报错。这样由多个执行上下文的变量对象构成的链表就叫做作用域链。
- this
  - this 的指向，是在函数被调用也就是执行上下文被创建时确定的。同一个函数由于调用方式的不同，this 会指向不一样的对象。

执行上下文的生命周期有三个阶段，分别是：

- 创建阶段
  - 生成变量对象
    - 创建 arguments：如果是函数上下文，首先会创建 `arguments` 对象，给变量对象添加形参名称和值。
    - 扫描函数声明：将函数名和函数引用存入 `VO` 中，如果 `VO` 中已经有同名函数，那么就进行覆盖
    - 扫描变量声明：将变量名存入 `VO` 中，并且将变量的值初始化为`undefined`
  - 建立作用域链：保存所有父变量对象到函数内部属性 [[scope]]
  - 确定 this 的指向
- 执行阶段
  - 变量赋值：变量对象转变为了活动对象
  - 函数的引用
  - 执行其他代码
- 销毁阶段

<img src="https:////upload-images.jianshu.io/upload_images/599584-391af3aad043c028.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1000/format/webp" alt="img" style="zoom: 80%;" />

```js
var scope = "global scope";
function checkscope() {
  var scope2 = "local scope";
  return scope2;
}
checkscope();
```

执行过程如下：

1.checkscope 函数被创建，保存作用域链到 内部属性[[scope]]

```
checkscope.[[scope]] = [globalContext.VO];
```

2.执行 checkscope 函数，创建 checkscope 函数执行上下文，checkscope 函数执行上下文被压入执行上下文栈

```
ECStack = [checkscopeContext,globalContext];
```

3.checkscope 函数并不立刻执行，开始做准备工作，第一步：复制函数[[scope]]属性创建作用域链

```
checkscopeContext = {Scope: checkscope.[[scope]]}
```

4.第二步：用 arguments 创建活动对象，随后初始化活动对象，加入形参、函数声明、变量声明

```
checkscopeContext = {    AO: {        arguments: {length: 0},        scope2: undefined    }，    Scope: checkscope.[[scope]],}
```

5.第三步：将活动对象压入 checkscope 作用域链顶端

```
checkscopeContext = {    AO: {        arguments: {length: 0},        scope2: undefined    },    Scope: [AO, [[Scope]]]}
```

6.准备工作做完，开始执行函数，随着函数的执行，修改 AO 的属性值

```
checkscopeContext = {    AO: {        arguments: {length: 0},        scope2: 'local scope'    },    Scope: [AO, [[Scope]]]}
```

7.查找到 scope2 的值，返回后函数执行完毕，函数上下文从执行上下文栈中弹出

```
ECStack = [globalContext];
```

### 闭包原理及结合项目优缺点￥￥￥￥￥￥

当 JS 代码执行一段可执行代码时，会创建对应的执行上下文。对于每个执行上下文，都有三个重要属性：变量对象，作用域链，this。每次函数调用都会以栈的方式来处理它们，这个栈，我们称其为函数调用栈（执行上下文栈）。当新的函数调用时，会产生新的执行上下文环境，压入栈中。当函数调用完成后，这个上下文环境及其中的数据都会被销毁，并弹出栈。

闭包由两部分组成。执行上下文(代号 A)，以及在该执行上下文中创建的函数（代号 B）。当 B 执行时，如果访问了 A 中变量对象中的值，那么闭包就会产生。A 先初始化到执行完毕，会被压入弹出执行上下文栈，当 B 函数执行的时候，B 维护了一个作用域链，因为这个作用域链，B 函数依然可以读取到 A 的 AO 的值，说明当 B 引用了 A.AO 中的值的时候，即使 A 被销毁了，但是 JavaScript 依然会让 A.AO 活在内存中，B 依然可以通过他的作用域链找到它，正是因为 JavaScript 做到了这一点，从而实现了闭包这个概念。

#### 使用闭包的注意点

闭包的优点：能够读取函数内部的变量，让这些变量一直存在于内存中，不会在调用结束后，被垃圾回收机制回收

闭包的缺点：正所谓物极必反，由于闭包会使函数中的变量保存在内存中，内存消耗很大，可能会导致内存泄漏，所以不能滥用闭包，解决办法是，退出函数之前，将不使用的局部变量删除 = null。

#### 闭包的使用场景

能够读取其他函数内部变量的函数（应用场景：要获取某函数内部的局部变量）：封装功能时(需要使用私有的属性和方法)，函数防抖、函数节流、给元素伪数组添加事件需要使用元素的索引值

```js
// 模拟私有属性function getGeneratorFunc() {  var _age = 22;  return function () {    return {      getAge: function () {        return _age;      },    };  };}var obj = getGeneratorFunc()();obj.getAge(); // 22obj._age; // undefined
```

```js
// for循环内给元素添加事件var more = document.getElementsByClassName("more");for (var i = 0; i < more.length; i++) {  //for循环是立即执行，for循环内的事件不立即执行  more[i].onclick = (function (n) {    //n为形参    return function () {      alert(n); //把与n相关的操作必须写在return function（）{}之内才能正常执行    };  })(i); //i为实参(把i传进去，使事件内部立即执行)}
```

### 闭包

闭包由两部分组成。执行上下文(代号 A)，以及在该执行上下文中创建的函数（代号 B）。

当 B 执行时，如果访问了 A 中变量对象中的值，那么闭包就会产生。

```JS
var scope = "global scope";function checkscope(){    var scope = "local scope";    function f(){return scope}    return f;}var foo = checkscope();foo();
```

这里直接给出简要的执行过程：

1. 进入全局代码，创建全局执行上下文，全局执行上下文压入执行上下文栈
2. 全局执行上下文初始化
3. 执行 checkscope 函数，创建 checkscope 函数执行上下文，checkscope 执行上下文被压入执行上下文栈
4. checkscope 执行上下文初始化，创建变量对象、作用域链、this 等
5. checkscope 函数执行完毕，checkscope 执行上下文从执行上下文栈中弹出
6. 执行 f 函数，创建 f 函数执行上下文，f 执行上下文被压入执行上下文栈
7. f 执行上下文初始化，创建变量对象、作用域链、this 等
8. f 函数执行完毕，f 函数上下文从执行上下文栈中弹出

了解到这个过程，我们应该思考一个问题，那就是：

当 f 函数执行的时候，checkscope 函数上下文已经被销毁了啊(即从执行上下文栈中被弹出)，怎么还会读取到 checkscope 作用域下的 scope 值呢？

当我们了解了具体的执行过程后，我们知道 f 执行上下文维护了一个作用域链：

```JS
fContext = {Scope: [AO, checkscopeContext.AO, globalContext.VO]}
```

对的，就是因为这个作用域链，f 函数依然可以读取到 checkscopeContext.AO 的值，说明当 f 函数引用了 checkscopeContext.AO 中的值的时候，即使 checkscopeContext 被销毁了，但是 JavaScript 依然会让 checkscopeContext.AO 活在内存中，f 函数依然可以通过 f 函数的作用域链找到它，正是因为 JavaScript 做到了这一点，从而实现了闭包这个概念。

###### 使用闭包的注意点

闭包的优点：能够读取函数内部的变量，让这些变量一直存在于内存中，不会在调用结束后，被垃圾回收机制回收

闭包的缺点：正所谓物极必反，由于闭包会使函数中的变量保存在内存中，内存消耗很大，所以不能滥用闭包，解决办法是，退出函数之前，将不使用的局部变量删除。

###### 闭包的使用场景

能够读取其他函数内部变量的函数（应用场景：要获取某函数内部的局部变量）：封装功能时(需要使用私有的属性和方法)，函数防抖、函数节流、函数柯里化、给元素伪数组添加事件需要使用元素的索引值

```js
// 模拟私有属性function getGeneratorFunc() {  var _age = 22;  return function () {    return {      getAge: function () {        return _age;      },    };  };}var obj = getGeneratorFunc()();obj.getAge(); // 22obj._age; // undefined
```

```js
// for循环内给元素添加事件var more = document.getElementsByClassName("more");for (var i = 0; i < more.length; i++) {  //for循环是立即执行，for循环内的事件不立即执行  more[i].onclick = (function (n) {    //n为形参    return function () {      alert(n); //把与n相关的操作必须写在return function（）{}之内才能正常执行    };  })(i); //i为实参(把i传进去，使事件内部立即执行)}
```

### 原型原型链

<img src="pic\d9f3fc3205db4aa78ebc5ab768ffc254~tplv-k3u1fbpfcp-zoom-1.image" alt="原型链示意图" style="zoom: 50%;" />

当使用构造函数来新建一个对象，每一个构造函数的内部都有一个 prototype 属性值，这个属性值是一个对象，这个对象包含了可以由该构造函数的所有实例共享的属性和方法。当我们使用构造函数新建一个对象后，在这个对象的内部将包含一个指针，这个指针指向构造函数的 prototype 属性对应的值，这个指针被称为对象的原型。一般来说我们是不应该能够获取到这个值的，但是现在浏览器中都实现了\_\_proto\_\_属性来让我们访问这个属性，但是我们最好不要使用这个属性，因为它不是规范中规定的。ES5 中新增了一个 Object.getPrototypeOf()方法，我们可以通过这个方法来获取对象的原型。当我们访问一个对象的属性时，如果这个对象内部不存在这个属性，那么它就会去它的原型对象里找这个属性，这个原型对象又会有自己的原型，于是就这样一直找下去，也就是原型链的概念。原型链的尽头一般来说都是 Object.prototype 所以这就是我们新建的对象为什么能够使用 toString()等方法的原因。

特点：当我们修改原型时，与之相关的对象也会继承这一改变。

### 继承的方式

#### 原型链继承

让新实例的原型等于父类的实例。

```js
function Parent() {
  this.name = "kevin";
}
Parent.prototype.getName = function () {
  console.log(this.name);
};
function Child() {}
Child.prototype = new Parent();
var child1 = new Child();
console.log(child1.getName()); // kevin
```

问题：

1.引用类型的属性被所有实例共享，举个例子：

```js
function Parent() {
  this.names = ["kevin", "daisy"];
}
function Child() {}
Child.prototype = new Parent();
var child1 = new Child();
child1.names.push("yayu");
console.log(child1.names); // ["kevin", "daisy", "yayu"]var child2 = new Child();js;console.log(child2.names); // ["kevin", "daisy", "yayu"]
```

2.在创建 Child 的实例时，不能向 Parent 传递参数.

有鉴于此, 实践中很少会单独使用原型链.为此,下面将有一些尝试以弥补原型链的不足.

#### 借用构造函数(经典继承)

- 场景：适用于 2 种构造函数之间逻辑有相似的情况
- 用.call()和.apply()将父类构造函数引入子类函数（在子类函数中做了父类函数的自执行（复制））

```js
function Parent() {
  this.names = ["kevin", "daisy"];
}
function Child() {
  Parent.call(this);
}
var child1 = new Child();
child1.names.push("yayu");
console.log(child1.names); // ["kevin", "daisy", "yayu"]var child2 = new Child();console.log(child2.names); // ["kevin", "daisy"]
```

优点：

1.避免了引用类型的属性被所有实例共享

2.可以在 Child 中向 Parent 传参

```js
function Parent(name) {
  this.name = name;
}
function Child(name) {
  Parent.call(this, name);
}
var child1 = new Child("kevin");
console.log(child1.name); // kevinvar child2 = new Child("daisy");console.log(child2.name); // daisy
```

缺点：

只能继承父类构造函数的属性，没有继承父类原型的属性
无法实现构造函数的复用。（每次用每次都要重新调用）
每个新实例都有父类构造函数的副本，臃肿。

#### 组合继承

原型链继承和经典继承双剑合璧。

```js
function Parent(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
Parent.prototype.getName = function () {
  console.log(this.name);
};
function Child(name, age) {
  Parent.call(this, name);
  this.age = age;
}
Child.prototype = new Parent();
var child1 = new Child("kevin", "18");
child1.colors.push("black");
console.log(child1.name); // kevinconsole.log(child1.age); // 18console.log(child1.colors); // ["red", "blue", "green", "black"]var child2 = new Child("daisy", "20");console.log(child2.name); // daisyconsole.log(child2.age); // 20console.log(child2.colors); // ["red", "blue", "green"]
```

优点：融合原型链继承和构造函数的优点，是 JavaScript 中最常用的继承模式。

缺点：调用了两次父类构造函数（耗内存），子类的构造函数会代替原型上的那个父类构造函数。

#### 原型式继承

```js
function createObj(o) {  function F() {}  F.prototype = o; //继承了传入的参数  return new F(); //返回函数对象}
```

用一个函数包装一个对象，然后返回这个函数的调用，这个函数就变成了个可以随意增添属性的实例或对象。object.create()就是这个原理。

缺点：包含引用类型的属性值始终都会共享相应的值，这点跟原型链继承一样。

```js
var person = { name: "kevin", friends: ["daisy", "kelly"] };
var person1 = createObj(person);
var person2 = createObj(person);
person1.name = "person1";
console.log(person2.name); // kevinperson1.firends.push("taylor");console.log(person2.friends); // ["daisy", "kelly", "taylor"]
```

注意：修改`person1.name`的值，`person2.name`的值并未发生改变，并不是因为`person1`和`person2`有独立的 name 值，而是因为`person1.name = 'person1'`，给`person1`添加了 name 值，并非修改了原型上的 name 值。

#### 寄生式继承

就是给原型式继承外面套了个壳子。

<img src="pic\940884-20190717162158915-1866300593.png" alt="img" style="zoom: 50%;" />

缺点：跟借用构造函数模式一样，每次创建对象都会创建一遍方法。

#### 寄生组合式继承

寄生：在函数内返回对象然后调用
　　　　组合：1、函数的原型等于另一个实例。2、在函数中用 apply 或者 call 引入另一个构造函数，可传参　
　　　　 <img src="pic\940884-20190717162220285-1478888936.png" alt="img" style="zoom: 50%;" />
　　　　重点：修复了组合继承的问题

这种方式的高效率体现它只调用了一次 Parent 构造函数，并且因此避免了在 Parent.prototype 上面创建不必要的、多余的属性。与此同时，原型链还能保持不变；因此，还能够正常使用 instanceof 和 isPrototypeOf。开发人员普遍认为寄生组合式继承是引用类型最理想的继承范式。

#### ES6 的 extends 继承

ES6 的继承机制是先创造父类的实例对象 this（所以必须先调用 super 方法），然后再用子类的构造函数修改 this

```js
class Person {  //父类  constructor(skin, language) {    //constructor是构造方法    this.skin = skin;    this.language = language;  }  say() {    console.log("我是父类");  }}class Chinese extends Person {  //子类  constructor(skin, language, positon) {    //console.log(this);//报错    super(skin, language);    //super();相当于父类的构造函数    //console.log(this);调用super后得到了this，不报错，this指向子类，相当于调用了父类.prototype.constructor.call(this)    this.positon = positon;  }  aboutMe() {    console.log(`${this.skin} ${this.language}  ${this.positon}`);  }}let obj = new Chinese("红色", "中文", "香港"); //调用只能通过new的方法得到实例,再调用里面的方法obj.aboutMe();obj.say();
```

### 继承

> 1. 原型链继承
>    1. `xxx.prototype = new Animal()构造函数`
>    2. 特点： 实例可以继承实例的构造函数的属性，父类构造函数的属性，父类原型的属性
>    3. 缺点
>       1. 无法向父类构造函数传参
>       2. 继承单一
>       3. 所有新实例都会共享父类实例的属性(即一个实例修改了原型属性，另外一个实例的原型属性也会被修改)
> 2. 构造函数继承
>    1. 借用 call()和 apply()将父类构造函数引入子类函数
>    2. 特点
>       1. 只能继承父类构造函数的属性，不能继承父类原型上的属性
>       2. 解决了原型链继承缺点 1、2、3
>       3. 可以继承多个构造函数属性(call 多个)
>       4. 在子实例中可以向父实例传参(call,apply)
>    3. 缺点
>       1. 只能继承父类构造函数的属性
>       2. 无法实现构造函数的复用
>       3. 每个新实例都有父类构造函数的副本，臃肿
> 3. 组合继承(常用)
>    1. 组合了两种模式的有点，传参和复用
>    2. 特点
>       1. 可以继承父类原型上的属性，可以传参，可以复用
>       2. 每个新实例引入的构造函数属性是私有的
>    3. 缺点
>       1. 调用了两次父类构造函数(消耗内存)，子类的构造函数会代替原型上的父类构造函数
> 4. 原型式继承
>    1. 用一个函数包装一个对象，然后返回这个函数的调用，这个函数就变成了可以随意增添属性的实例或对象。object.create()就是这个原理
>    2. 特点
>       1. 类似于复制一个对象，用函数来包装
>    3. 缺点
>       1. 所以实例都会继承原型上的属性
>       2. 无法实现复用
> 5. 寄生组合继承
>    1. 给原型式继承外卖套了个壳子
>    2. 优点：没有创建自定义类型，因为只是套了个壳子返回对象，这个函数顺利成章就成了创建的新对象
>    3. 缺点：没有用到原型，无法复用
> 6. extends 继承
>    1. `class My extends Other { constructor(x,y,z) {super(x,y)}}`
>    2. class 类使用 extends 继承，在 constructor 中使用 super 来继承

```js
// 1.原型链继承function Animal() {    this.name = 'cat'    this.msg = {        age: 9    }}Animal.prototype.greet = function() {    console.log('haha');}function Dog() {    this.name = 'dog'}Dog.prototype = new Animal() // 核心步骤const a = new Dog()a.msg.age = '99'console.log(a); // msg中的age为99// 2.构造函数继承// 缺点：1) 只能继承父类的实例属性和方法，不能继承原型属性/方法// 2) 性能不好，每个子类都会拥有父类实例的副本function Animal() {    this.name = 'cat'    this.msg = {        age: 9    }    this.sad = function () {        console.log('123');    }}Animal.call(obj) // this.name 中的this就会指向objAnimal.prototype = {    greet: function () {        console.log('haha');    },    sad: function () {        console.log('heihei');    }}function Dog() {    Animal.call(this) // 核心步骤}const a = new Dog()a.sad() // 123// a.greet() // 报错无法调用，无法调用原型链上的方法a.msg.age = 99console.log(a); // a.msg.age = 99// 3.组合继承：原型链 + 构造函数function Animal() {    this.name = 'cat'    this.msg = {        age: 9    }    this.sad = function () {        console.log('123');    }}Animal.prototype = {    greet: function () {        console.log('haha');    },    happy: function () {        console.log('heihei');    }}function Dog() {    Animal.call(this) // 构造函数}Dog.prototype = new Animal()const a = new Dog()console.log(a); // 所有的属性和方法均可获取到// 4.型式继承 利用一个空对象作为中介，将某个对象直接赋值给空对象构造函数的原型//  缺点： 无法传递参数；不能做到函数复用function inheritObject(obj){    function F(){};    F.prototype = obj;    return new F();}var situation = {    companies:['bigo','yy','uc'];    area:'guangzhou';}var situationA = inheritObject(situation);console.log(situationA.area)     //'guangzhou'// 5.寄生式继承 在原型式继承的基础上，增强对象，返回构造函数// 缺点同上 function createAnother(original){  var clone = object(original); // 或 Object.create(original)  clone.sayHi = function(){  // 以某种方式来增强对象    alert("hi");  };  return clone; // 返回这个对象}var person = {  name: 'Nicholas',  friends : ["Shelby","Coury","Van"]}var anotherPerson  = createAnother(person)// 6.extends(es6)写法：class Point {}class ColorPoint extends Point {    // 定义了一个ColorPoint类，该类通过extends关键字，继承了Point类的所有属性和方法}class A {}class B extends A {    constructor () {        super()    }}
```

### 谈谈 This 对象的理解

this 的绑定分为 new 绑定 显式绑定 隐式绑定 默认绑定

> 如何准确判断 this 指向的是什么？

1. 函数是否在 new 中调用(new 绑定)，如果是，那么 this 绑定的是实例。（new 绑定）
2. 函数是否通过 call,apply 调用，或者使用了 bind，如果是，那么 this 绑定的就是指定的对象。（显式绑定）
3. 函数是否在某个上下文对象中调用，如果是的话，this 绑定的是那个上下文对象。一般是 obj.foo()。（隐式绑定）
4. 如果以上都不是，通常是独立函数调用，绑定到全局对象。（默认绑定）
5. 如果把 null 或者 undefined 作为 this 的绑定对象传入 call、apply 或者 bind，这些值在调用时会被忽略，实际应用的是默认绑定规则。
6. 如果是箭头函数，箭头函数的 this 继承的是外层代码块的 this。

<img src="pic\d702cb89f1fd49b5908fb0a0c77e799a" alt="前端面试大全：JS 基础知识点及常考面试题（一）" style="zoom: 80%;" />

### call apply bind

![img](pic\1535346409-7922-20170316173631526-1279562612.png)

```
obj.myFun.call(db,'成都','上海')；　　　　 // 德玛 年龄 99  来自 成都去往上海obj.myFun.apply(db,['成都','上海']);      // 德玛 年龄 99  来自 成都去往上海obj.myFun.bind(db,'成都','上海')();       // 德玛 年龄 99  来自 成都去往上海obj.myFun.bind(db,['成都','上海'])();　　 // 德玛 年龄 99  来自 成都, 上海去往 undefined　
```

#### 模拟 Function.prototype.call()

```js
Function.prototype.call1 = function (ctx, ...args) {  ctx.fn = this || window; // 防止ctx为null的情况 若传入的值为null，此时this指向window  // ctx为destination   this指向source   那么就是destination.fn = source;  let res = ctx.fn(...args); // 执行函数  delete ctx.fn; // 在删除这个属性  return res; // 调用call的函数返回什么，call返回什么};console.log(source.call1(destination, 18, "male"));
```

#### 模拟 Function.prototype.apply()

```js
Function.prototype.apply1 = function (ctx, args) {
  ctx.fn = this || window;
  args = args || [];
  let res = ctx.fn(...args);
  delete ctx.fn;
  return res;
};
console.log(source.apply1(destination, [18, "male"]));
```

call 的性能要比 apply 好一些（尤其是传递给函数的参数超过三个的时候），所以后期开发的时候，可以使用 call 多一点

#### 模拟 Function.prototype.bind()

```js
Function.prototype.bind1 = function(ctx,...args){    var that = this;//外层的this通过闭包传入内部函数中 that肯定是source    let f = return function(){//定义了一个函数        console.log(this);//这个时候打印this就是一个_proto_指向f.prototype的对象,因为f.prototype==>source.prototype，所以this._proto_==>source.prototype        // 将外层函数的参数和内层函数的参数合并        var all_args = [...args].concat([...arguments]);        //正常不用new的时候this指向当前调用处的this指针(在全局环境中执行，this就是window对象)；使用new的话这个this对象的原型链上有一个类型是f的原型对象。        //那么判断一下，如果this instanceof f，那么real_ctx=this,否则real_ctx=ctx;        var real_ctx = this instanceof f ? this : ctx;        return that.apply(real_ctx, all_args);    }    // 函数的原型指向source的原型，这样执行new f()的时候this就会指向一个新的对象，这个对象通过原型链指向source，这正是我们上面执行apply的时候需要传入的参数    f.prototype = this.prototype;    return f;//返回函数}var res = source.bind1(destination,18);console.log(new res("male")); // this是指向sourceconsole.log(res("male")); // this指向destination
```

### new 一个构造函数发生了什么

当我们 new 一个对象，就可以访问原型中的属性，还可以访问构造器中指向 this 的属性。所以 JavaScript 调用 new 的过程主要由下面四步组成

- 创建一个空的简单 JavaScript 对象（即{}）
- 将空对象链接到原型中
- 绑定 this
- 返回新对象 如果该函数没有返回对象，则返回 this

```JS
function Person(name){this.name = name}Person.prototype.getName = function(){return name}function create() {  let obj = new Object();//第一步新建一个对象  //取出第一个参数，就是我们要传入的构造函数。因为shift会修改原数组，所以arguments会被去除第一个参数。  //shift() 方法用于把数组的第一个元素从其中删除，并返回第一个元素的值。  let constructor = [].shift.call(arguments)//第二步链接到原型中  console.log(constructor);  console.log(arguments);  //创建一个空对象，让他的原型链指向Person.prototype（作为Person的一个实例）  obj.__proto__ = constructor.prototype;//第二步链接到原型中  //利用apply，改变构造函数this指向到新建对象，这样obj就能访问到构造函数中的属性。  let res = constructor.apply(obj, arguments);//第三步绑定this  if(res){     return res;  }else{     return obj;  }}person = create(Person,"xuan");
```

<img src="pic\72c417ab02fa421ab2017ddbb05d2f92~tplv-k3u1fbpfcp-watermark.image" alt="3-1.png" style="zoom: 50%;" /> <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d9f3fc3205db4aa78ebc5ab768ffc254~tplv-k3u1fbpfcp-zoom-1.image" alt="原型链示意图" style="zoom: 50%;" />

### 垃圾回收机制￥

有些数据被使用之后，可能就不再需要了，我们把这种数据称为垃圾数据。如果这些垃圾数据一直保存在内存中，那么内存会越用越多，所以我们需要对这些垃圾数据进行回收，以释放有限的内存空间

#### 不同语言的垃圾回收策略

垃圾数据回收分为手动回收和自动回收两种策略。手动回收策略，何时分配内存、何时销毁内存都是由代码控制的。另外一种使用的是自动垃圾回收的策略，如 JavaScript，产生的垃圾数据由垃圾回收器释放，并不需要手动通过代码来释放。因为数据是存储在栈和堆两种内存空间中的，分别介绍“栈中的垃圾数据”和“堆中的垃圾数据”是如何回收的。

#### 调用栈中的数据是如何回收的

如果执行到 A 函数时，会创建 A 函数的执行上下文，并将 A 函数的执行上下文压入到调用栈中，与此同时，还有一个记录当前执行状态的指针（称为 ESP），指向调用栈中 A 函数的执行上下文，表示当前正在执行 A 函数。当 A 函数执行完成之后，函数执行流程就进入了 B 函数，那这时就需要销毁 A 函数的执行上下文了。JavaScript 会将 ESP 下移到 B 函数的执行上下文，这个下移操作就是销毁 A 函数执行上下文的过程。

#### 堆中的数据是如何回收的

在 V8 中会把堆分为新生代和老生代两个区域，新生代中存放的是生存时间短的对象，老生代中存放的生存时间久的对象。

##### 1.副垃圾回收器（主要负责新生代的垃圾回收）

把新生代空间对半划分为两个区域，一半是对象区域，一半是空闲区域<img src="pic\b7facf1c4b1c4b65a7dcc0f6ebb457b3~tplv-k3u1fbpfcp-zoom-1.image" alt="img" style="zoom: 33%;" />

新加入的对象都会存放到对象区域，当对象区域快被写满时，就需要执行一次垃圾清理操作。首先要对对象区域中的垃圾做标记；标记完成之后，就进入垃圾清理阶段，副垃圾回收器会把这些存活的对象复制到空闲区域中，同时它还会把这些对象有序地排列起来，所以这个复制过程，也就相当于完成了内存整理操作，复制后空闲区域就没有内存碎片了。对象区域与空闲区域进行角色翻转，也就是原来的对象区域变成空闲区域，原来的空闲区域变成了对象区域。这样就完成了垃圾对象的回收操作，如果新生区空间设置得太大了，那么每次清理的时间就会过久，所以为了执行效率，一般新生区的空间会被设置得比较小。也正是因为新生区的空间不大，所以很容易被存活的对象装满整个区域。为了解决这个问题，经过两次垃圾回收依然还存活的对象，会被移动到老生区中。

##### 2.主垃圾回收器（主要负责老生代的垃圾回收）

主垃圾回收器是采用标记 - 清除（Mark-Sweep）的算法进行垃圾回收的。首先是标记过程阶段。标记阶段就是从一组根元素开始，递归遍历这组根元素，在这个遍历过程中，能到达的元素称为活动对象，没有到达的元素就可以判断为垃圾数据<img src="pic\8db6ede0e8124975a585229c64b12024~tplv-k3u1fbpfcp-zoom-1.image" alt="img" style="zoom: 50%;" />

接下来就是垃圾的清除过程。它和副垃圾回收器的垃圾清除过程完全不同，你可以理解这个过程是清除掉红色标记数据的过程，可参考下图大致理解下其清除过程：<img src="pic\80eadc2f679a40358cf1f1a0b2d97986~tplv-k3u1fbpfcp-zoom-1.image" alt="img" style="zoom: 33%;" />

对一块内存多次执行标记 - 清除算法后，会产生大量不连续的内存碎片。而碎片过多会导致大对象无法分配到足够的连续内存，于是又产生了另外一种算法——标记 - 整理（Mark-Compact），让所有存活的对象都向一端移动<img src="pic\1fd5a8194baf4667a4e7fd36a92e9317~tplv-k3u1fbpfcp-zoom-1.image" alt="img" style="zoom: 33%;" />

#### 全停顿

由于 JavaScript 是运行在主线程之上的，一旦执行垃圾回收算法，都需要将正在执行的 JavaScript 脚本暂停下来，待垃圾回收完毕后再恢复脚本执行。我们把这种行为叫做全停顿<img src="pic\c01b4847298f481cb1ddacd1c19f5ca4~tplv-k3u1fbpfcp-zoom-1.image" alt="img" style="zoom: 33%;" />

在 V8 新生代的垃圾回收中，因其空间较小，且存活对象较少，所以全停顿的影响不大，但老生代就不一样了。如果在执行垃圾回收的过程中，占用主线程时间过久，会造成页面的卡顿现象。为了降低老生代的垃圾回收而造成的卡顿，使用增量标记算法，可以把一个完整的垃圾回收任务拆分为很多小的任务，这些小的任务执行时间比较短，可以穿插在其他的 JavaScript 任务中间执行，就不会让用户因为垃圾回收任务而感受到页面的卡顿了。<img src="pic\a147de2f6d124f69a0efa4e2b2332370~tplv-k3u1fbpfcp-zoom-1.image" alt="img" style="zoom: 33%;" />

### 计数回收

所谓"引用计数"是指语言引擎有一张"引用表"，保存了内存里面所有的资源（通常是各种值）的引用次数。如果一个值的引用次数是 0，就表示这个值不再用到了，因此可以将这块内存释放。

![img](pic\16a3973348fd85ed~tplv-t2oaga2asx-watermark.awebp)

上图中，左下角的两个值，没有任何引用，所以可以释放。

如果一个值不再需要了，引用数却不为 0，垃圾回收机制无法释放这块内存，从而导致内存泄漏。

### 内存溢出 内存泄漏

#### 1.内存溢出

- 当程序运行时需要的内存超过剩余的内存时，就会有内存溢出的错误。由于循环量过大而导致物理内存不够

```JS
const obj = {}for (var i = 0; i < 100000000; i++) {   obj[i] = new Array(100000000);console.log('-----------------')}
```

#### 2.内存泄露

- 占用的内存没有及时释放。内存泄露积累多了就容易导致内存溢出。

- 常见的内存泄露：意外的全局变量、没有及时清理的定时器或回调函数、闭包。

  1.意外的全局变量

```js
function fn1() {
  a = 1;
  console.log(a);
}
fn1();
```

执行函数的时候，由于变量提升而导致 a 变成全局变量，函数执行完之后 a 还占着空间

2.定时器没有关闭

```js
const intervalTime = setInterval(function () {
  console.log("------");
}, 2000);
```

由于没关闭定时器而导致内存溢出，除非浏览器关闭、刷新，不然会一直执行下去。保存良好习惯，用完就关

```js
clearInterval(intervalTime); // 关闭定时器，释放内存
```

3.闭包

执行完函数之后 a 没有被释放掉，是因为 fn 保存了 fn1 函数。记得清空变量，等待回收

```js
fn = null; // 释放内存
```

### Ajax 原理

- Ajax 的原理简单来说是在⽤户和服务器之间加了—个中间层( AJAX 引擎)，通过 XmlHttpRequest 对象来向服务器发异步请求，从服务器获得数据，然后⽤ javascrip t 来操作 DOM ⽽更新⻚⾯。使⽤户操作与服务器响应异步化。这其中最关键的⼀步就是从服 务器获得请求数据
- Ajax 的过程只涉及 JavaScript 、 XMLHttpRequest 和 DOM 。 XMLHttpRequest 是 ajax 的核⼼机制

```
    /** 1. 创建连接 **/    let xhr = null;    xhr = new XMLHttpRequest()    /** 2. 连接服务器 **/    xhr.open('get', url, true)    /** 3. 发送请求 **/    xhr.send(null);    /** 4. 接受请求 **/    xhr.onreadystatechange = function(){    if(xhr.readyState == 4){    if(xhr.status == 200){    success(xhr.responseText); } else {    /** false **/    fail && fail(xhr.status); } } }
```

**ajax 有那些优缺点?**

- 优点：
  - 通过异步模式，提升了⽤户体验.
  - 优化了浏览器和服务器之间的传输，减少不必要的数据往返，减少了带宽占⽤.
  - Ajax 在客户端运⾏，承担了⼀部分本来由服务器承担的⼯作，减少了⼤⽤户量下的服 务器负载。 Ajax 可以实现动态不刷新（局部刷新）
- 缺点：
  - 安全问题 AJAX 暴露了与服务器交互的细节。
  - 对搜索引擎的⽀持⽐较弱。 不容易调试。

### 跨域方式

#### 一、什么是跨域？

1.什么是同源策略及其限制内容？

同源策略是一种约定，它是浏览器最核心也最基本的安全功能，如果缺少了同源策略，浏览器很容易受到 XSS、CSRF 等攻击。所谓同源是指"协议+域名+端口"三者相同，即便两个不同的域名指向同一个 ip 地址，也非同源。

<img src="pic\1763177-20190820155326179-683454722-163539069359819.png" alt="img" style="zoom:50%;" />

有三个标签是允许跨域加载资源：`<img src=XXX>` `<link href=XXX>` `<script src=XXX>`

2.常见跨域场景

当协议、子域名、主域名、端口号中任意一个不相同时，都算作不同域。不同域之间相互请求资源，就算作“跨域”

| URL                                                    | 说明                           | 是否允许通信                            |
| ------------------------------------------------------ | ------------------------------ | --------------------------------------- |
| http://www.a.com/a.js http://www.a.com/b.js            | 同一域名下                     | 允许                                    |
| http://www.a.com/lab/a.js http://www.a.com/script/b.js | 同一域名下不同文件夹           | 允许                                    |
| http://www.a.com:8000/a.js http://www.a.com/b.js       | 同一域名，不同端口             | 不允许                                  |
| http://www.a.com/a.js https://www.a.com/b.js           | 同一域名，不同协议             | 不允许                                  |
| http://www.a.com/a.js http://70.32.92.74/b.js          | 域名和域名对应 ip              | 不允许                                  |
| http://www.a.com/a.js http://script.a.com/b.js         | 主域相同，子域不同             | 不允许                                  |
| http://www.a.com/a.js http://a.com/b.js                | 同一域名，不同二级域名（同上） | 不允许（cookie 这种情况下也不允许访问） |
| http://www.cnblogs.com/a.js http://www.a.com/b.js      | 不同域名                       | 不允许                                  |

特别说明两点：

第一：如果是协议和端口造成的跨域问题“前台”是无能为力的。

第二：在跨域问题上，仅仅是通过协议, 域名和端口是否匹配而不会根据域名对应的 IP 地址是否相同来判断

这里你或许有个疑问：请求跨域了，那么请求到底发出去没有？

跨域并不是请求发不出去，请求能发出去，服务端能收到请求并正常返回结果，只是结果被浏览器拦截了。

#### 二、跨域解决方案

1.JSONP

缺点是仅支持 get 方法具有局限性

- 声明一个回调函数，其函数名(如 func)当做参数值，要传递给跨域请求数据的服务器，函数形参为要获取目标数据(服务器返回的 data)。
- 创建一个`<script>`标签，把那个跨域的 API 数据接口地址，赋值给 script 的 src,还要在这个地址中向服务器传递该函数名（可以通过问号传参?callback=func）
- 服务器接收到请求后，需要进行特殊的处理：把传递进来的函数名和它需要给你的数据拼接成一个字符串<img src="pic\3c9475f284674481b494feba85341be4~tplv-k3u1fbpfcp-watermark.image" alt="2.png" style="zoom: 50%;" />
- 最后服务器把准备的数据通过 HTTP 协议返回给客户端，客户端再调用执行之前声明的回调函数（func），对返回的数据进行操作。func 是全局函数

JSONP 都是 GET 和异步请求的，不存在其他的请求方式和同步请求，且 jQuery 默认就会给 JSONP 的请求清除缓存。

```js
$.ajax({  url: "http://crossdomain.com/jsonServerResponse",  dataType: "jsonp",  type: "get", //可以省略  jsonpCallback: "show", //->自定义传递给服务器的函数名，而不是使用jQuery自动生成的，可省略  jsonp: "callback", //->把传递函数名的那个形参callback，可省略  success: function (data) {    console.log(data);  },});
```

2.cors

CORS 需要浏览器和后端同时支持。浏览器会自动进行 CORS 通信，实现 CORS 通信的关键是后端。只要后端实现了 CORS，就实现了跨域。服务端设置 Access-Control-Allow-Origin 就可以开启 CORS。 该属性表示哪些域名可以访问资源，如果设置通配符则表示所有网站都可以访问资源。设置 CORS 和前端没什么关系

3. nginx 反向代理

实现原理类似于 Node 中间件代理，需要你搭建一个中转 nginx 服务器，用于转发请求。

4. proxy

#### 三、总结

- CORS 支持所有类型的 HTTP 请求，是跨域 HTTP 请求的根本解决方案
- JSONP 只支持 GET 请求，JSONP 的优势在于支持老式浏览器，以及可以向不支持 CORS 的网站请求数据。
- 不管是 Node 中间件代理还是 nginx 反向代理，主要是通过同源策略对服务器不加限制。
- 日常工作中，用得比较多的跨域方案是 cors 和 nginx 反向代理

### eventloop ￥

js 的任务分为两种，同步任务和异步任务：

- 同步任务就是按照顺序一个一个的执行任务，后一个任务要执行必须等它前一个任务完成
- 异步任务（比如回调）不会占用主线程，会被塞到一个任务队列，等主线程的任务执行完毕，就会把这个异步任务队列里的任务放回主线程依次执行

- 同步和异步任务分别进入不同的执行"场所"，同步的进入主线程，异步的进入 Event Table 并注册函数。
- 当指定的事情完成时，Event Table 会将这个函数移入 Event Queue。
- 主线程内的任务执行完毕为空，会去 Event Queue 读取对应的函数，进入主线程执行。
- 上述过程会不断重复，也就是常说的 Event Loop<img src="pic\2-4.png" alt="img" style="zoom: 50%;" />

#### 开始

除了广义的同步任务和异步任务，我们对任务有更精细的定义：

- macro-task(宏任务)：包括整体代码 script，setTimeout，setInterval 等
- micro-task(微任务)： promise 回调，process.nextTick 等

事件循环的顺序，决定 js 代码的执行顺序。进入整体代码(宏任务)后，开始第一次循环。接着执行所有的微任务。然后再次从宏任务开始，找到其中一个任务队列执行完毕，再执行所有的微任务。

<img src="pic\2-5.png" alt="img" style="zoom: 50%;" />
我们来分析一段较复杂的代码，看看你是否真的掌握了 js 的执行机制：

```js
console.log("1");
setTimeout(function () {
  console.log("2");
  process.nextTick(function () {
    console.log("3");
  });
  new Promise(function (resolve) {
    console.log("4");
    resolve();
  }).then(function () {
    console.log("5");
  });
});
process.nextTick(function () {
  console.log("6");
});
new Promise(function (resolve) {
  console.log("7");
  resolve();
}).then(function () {
  console.log("8");
});
setTimeout(function () {
  console.log("9");
  process.nextTick(function () {
    console.log("10");
  });
  new Promise(function (resolve) {
    console.log("11");
    resolve();
  }).then(function () {
    console.log("12");
  });
});
```

第一轮事件循环流程分析如下：

- 整体 script 作为第一个宏任务进入主线程，遇到`console.log`，输出 1。
- 遇到`setTimeout`，其回调函数被分发到宏任务 Event Queue 中。我们暂且记为`setTimeout1`。
- 遇到`process.nextTick()`，其回调函数被分发到微任务 Event Queue 中。我们记为`process1`。
- 遇到`Promise`，`new Promise`直接执行，输出 7。`then`被分发到微任务 Event Queue 中。我们记为`then1`。
- 又遇到了`setTimeout`，其回调函数被分发到宏任务 Event Queue 中，我们记为`setTimeout2`。

<img src="C:/Users/Administrator/Desktop/新建文件夹/李厚伯/前端jscss总结笔记/js/2-6.png" alt="img" style="zoom: 67%;" />

- 上表是第一轮事件循环宏任务结束时各 Event Queue 的情况，此时已经输出了 1 和 7。
- 我们发现了`process1`和`then1`两个微任务。
- 执行`process1`,输出 6。
- 执行`then1`，输出 8。

好了，第一轮事件循环正式结束，这一轮的结果是输出 1，7，6，8。那么第二轮时间循环从`setTimeout1`宏任务开始：

- 首先输出 2。接下来遇到了`process.nextTick()`，同样将其分发到微任务 Event Queue 中，记为`process2`。`new Promise`立即执行输出 4，`then`也分发到微任务 Event Queue 中，记为`then2`。

<img src="C:/Users/Administrator/Desktop/新建文件夹/李厚伯/前端jscss总结笔记/js/2-7.png" alt="img" style="zoom:67%;" />

- 第二轮事件循环宏任务结束，我们发现有`process2`和`then2`两个微任务可以执行。
- 输出 3。
- 输出 5。
- 第二轮事件循环结束，第二轮输出 2，4，3，5。
- 第三轮事件循环开始，此时只剩 setTimeout2 了，执行。
- 直接输出 9。
- 将`process.nextTick()`分发到微任务 Event Queue 中。记为`process3`。
- 直接执行`new Promise`，输出 11。
- 将`then`分发到微任务 Event Queue 中，记为`then3`。

<img src="C:/Users/Administrator/Desktop/新建文件夹/李厚伯/前端jscss总结笔记/js/2-8.png" alt="img" style="zoom:67%;" />

- 第三轮事件循环宏任务执行结束，执行两个微任务`process3`和`then3`。
- 输出 10。
- 输出 12。
- 第三轮事件循环结束，第三轮输出 9，11，10，12。

整段代码，共进行了三次事件循环，完整的输出为 1，7，6，8，2，4，3，5，9，11，10，12。

#### 异步编程的实现⽅式

- 回调函数
  - 优点：简单、容易理解
  - 缺点：不利于维护，代码耦合⾼
- 事件监听(采⽤时间驱动模式，取决于某个事件是否发⽣)：
  - 优点：容易理解，可以绑定多个事件，每个事件可以指定多个回调函数
  - 缺点：事件驱动型，流程不够清晰
- 发布/订阅(观察者模式)
  - 类似于事件监听，但是可以通过‘消息中⼼ ʼ，了解现在有多少发布者，多少订阅者
- Promise 对象
  - 优点：可以利⽤ then ⽅法，进⾏链式写法；可以书写错误时的回调函数；
  - 缺点：编写和理解，相对⽐较难
- Generator 函数
  - 优点：函数体内外的数据交换、错误处理机制
  - 缺点：流程管理不⽅便
- async 函数
  - 优点：内置执⾏器、更好的语义、更⼴的适⽤性、返回的是 Promise、结构清晰。
  - 缺点：错误处理机制

### 说一下 promise ￥￥

JavaScript 作为单线程语言，同一时间只能做一件事情，那么可能会存在一些问题，于是乎出现了异步的概念。异步可能会产生回调地狱。因此我们需要 Promise 来解决这个问题。通过创建一个函数返回一个 Promise 对象，再利用.then 方法，将嵌套的异步代码弄得看起来像同步一样，出现问题可以轻易的调试和修改。

- Promise 需要一个函数作为参数，该函数有两个参数，这两个参数也是函数，可以在 Promise 内部调用，当异步操作成功时，调用 resolve，否则 reject。

```js
let p =new Promise(function(resolve, reject){    if(/* 异步操作成功 */){resolve(data)}    else{reject(err)}})
```

- state

Promise 是有“状态”的，分别是 pending（等待态）、fulfilled（成功态）、rejected（失败态），pending 可以转换为 fulfilled 或 rejected，但 fulfilled 和 rejected 不可相互转化。

- resolve/reject 方法

resolve 方法可以将 pending 转为 fulfilled，reject 方法可以将 pending 转为 rejected。

- then 方法

给 Promise 上的 then 方法传递两个函数作为参数，可以提供改变状态时的回调，第一个函数是成功的回调，第二个则是失败的回调。

```js
p.then(function(data){ console.log(data)// resolve方法会将参数传进成功的回调      }, function(err){ console.log(err)// reject方法会将失败的信息传进失败的回调})
```

- 链式调用

除此之外，每一个 then 方法都会返回一个新的 Promise 实例，让 then 方法支持链式调用，并可以通过返回值将参数传递给下一个 then

### async await 及内部实现￥￥

Promise 解决了回调地狱的问题，但是如果遇到复杂的业务，代码里面会包含大量的 then 函数，使得代码依然不是太容易阅读。基于这个原因，ES7 引入了 async/await，`async/await`被称为 JS 中异步终极解决方案。同步的方式来书写异步代码。async 是 Generator 函数的语法糖，并对 Generator 函数进行了改进。

#### async

> Async 声明⼀个异步函数⾃动将常规函数转换成 Promise，返回值也是⼀个 Promise 对象

#### await

1. 放置在 Promise 调⽤之前，await 强制其他代码等待，直到 Promise 完成并返回结果
2. 只能在 async 函数内部使⽤

#### Generator

`Generator函数`被调用时并不会执行，只有当调用`next方法`、内部指针指向该语句时才会执行，`即函数可以暂停，也可以恢复执行`。每次调用遍历器对象的 next 方法，就会返回一个有着`value`和`done`两个属性的对象。`value`属性表示当前的内部状态的值，是 yield 表达式后面那个表达式的值；`done`属性是一个布尔值，表示是否遍历结束。

async 函数就是将 Generator 函数的星号（\*）替换成 async，将 yield 替换成 await

async 函数对 Generator 函数的改进，体现在以下四点：

1. `内置执行器`。Generator 函数的执行必须依靠执行器，而 async 函数自带执行器，无需手动执行 next() 方法。
2. `更好的语义`。async 和 await，比起星号和 yield，语义更清楚了。async 表示函数里有异步操作，await 表示紧跟在后面的表达式需要等待结果。
3. `更广的适用性`。yield 命令后面只能是 Thunk 函数或 Promise 对象，而 async 函数的 await 命令后面，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时会自动转成立即 resolved 的 Promise 对象）。
4. `返回值是 Promise`。async 函数返回值是 Promise 对象，比 Generator 函数返回的 Iterator 对象方便，可以直接使用 then() 方法进行调用。

#### async/await 相⽐于 Promise 的优势？

Promise 虽然摆脱了回调地狱，但是 then 的链式调⽤也会带来额外的阅读负担，async/await ⼏乎是同步的写法，⾮常优雅 ，async/await 错误处理友好，可以⽤成熟的 try/catch，调试友好

### 谈谈你对 AMD、CMD 的理解

- CommonJS 是服务器端模块的规范， Node.js 采⽤了这个规范。 CommonJS 规范加载模 块是同步的，也就是说，只有加载完成，才能执⾏后⾯的操作。 AMD 规范则是⾮同步加载 模块，允许指定回调函数
- AMD 推荐的⻛格通过返回⼀个对象做为模块对象， CommonJS 的⻛格通过对 module.exports 或 exports 的属性赋值来达到暴露模块对象的⽬的

**es6 模块 CommonJS、AMD、CMD**

- CommonJS 的规范中，每个 JavaScript ⽂件就是⼀个独⽴的模块上下⽂（ module context ），在这个上下⽂中默认创建的属性都是私有的。也就是说，在⼀个⽂件定义的 变量（还包括函数和类），都是私有的，对其他⽂件是不可⻅的。
- CommonJS 是同步加载模块,在浏览器中会出现堵塞情况，所以不适⽤
- AMD 异步，需要定义回调 define ⽅式
- es6 ⼀个模块就是⼀个独⽴的⽂件，该⽂件内部的所有变量，外部⽆法获取。如果你希 望外部能够读取模块内部的某个变量，就必须使⽤ export 关键字输出该变量 es6 还可 以导出类、⽅法，⾃动适⽤严格模式

### eval 是做什么的

- 它的功能是把对应的字符串解析成 JS 代码并运⾏
- 应该避免使⽤ eval ，不安全，⾮常耗性能（ 2 次，⼀次解析成 js 语句，⼀次执⾏）
- 由 JSON 字符串转换为 JSON 对象的时候可以⽤ eval，var obj =eval('('+ str +')')

### javascript 代码中的"use strict";是什么意思

- use strict 是⼀种 ECMAscript 5 添加的（严格）运⾏模式,这种模式使得 Javascript 在更严格的条件下运⾏,使 JS 编码更加规范化的模式,消除 Javascript 语法的⼀些不合 理、不严谨之处，减少⼀些怪异⾏为

### 深浅拷贝￥￥￥

- 浅拷贝是创建一个新对象，这个对象有着原始对象属性值。如果是基本类型，拷贝的就是基本类型，如果是引用类型，拷贝的就是内存地址 ，所以如果其中一个对象改变了这个地址，就会影响到另一个对象。即拷贝前后基本数据类型不影响，引用数据类型会互相影响。

- 深拷贝是将一个对象从内存中完整的拷贝一份出来,从堆内存中开辟一个新的区域存放新对象,且修改新对象不会影响原对象。

对于基本数据类型的拷贝，并没有深浅拷贝的区别，我们所说的深浅拷贝都是对于引用数据类型而言的。

#### 浅拷贝的实现方式

1.Object.assign()

2.函数库 lodash 的\_.clone 方法

3.展开运算符...

4.Array.prototype.concat()

5.Array.prototype.slice()

#### 深拷贝的实现方式

1.JSON.parse(JSON.stringify())

这种方法虽然可以实现数组或对象深拷贝,但不能处理函数和特殊的对象，诸如 RegExp, Date, Set, Map 等，因为这两者基于 JSON.stringify 和 JSON.parse 处理后，得到的函数就不再是函数（变为 null）了。

2.函数库 lodash 的\_.cloneDeep 方法

<img src="pic\8e438195033148e690c0322786e112f5~tplv-k3u1fbpfcp-watermark.image" alt="1.png" style="zoom:80%;" />

<img src="pic\b5b6de5c96f64c319c2d213175fcdd7b~tplv-k3u1fbpfcp-watermark.image" alt="1.png" style="zoom:80%;" />

### 节流防抖￥￥￥

节流和防抖是网页性能优化的手段之一，函数防抖和函数节流都是防止某一时间频繁触发，但是这两之间的原理却不一样。比如有一个输入框，**防抖**——让输入框更智能化，在用户输入完成超过一定时间才输出结果。**节流**——在连续不断输入时，节流很有规律，间隔时间执行。

**结合应用场景**

- 防抖：window 触发 resize 的时候，不断的调整浏览器窗口大小会不断的触发这个事件，用防抖来让其只触发一次
- 节流：
  - 鼠标不断点击触发，mousedown(单位时间内只触发一次)
  - 监听滚动事件，比如是否滑到底部自动加载更多，用节流

#### 实现

**节流**

```js
// fn是我们需要包装的事件回调, interval是时间间隔的阈值Function.prototype.throttle = (fn, interval) => {  let last = 0; // last为上一次触发回调的时间  return function () {    // 将throttle处理结果当作函数返回    let context = this; // 保留调用时的this上下文    let args = arguments; // 保留调用时传入的参数    let now = +new Date(); // 记录本次触发回调的时间    if (now - last >= interval) {      // 判断上次触发的时间和本次触发的时间差是否小于时间间隔的阈值      last = now; // 如果时间间隔大于我们设定的时间间隔阈值，则执行回调      fn.apply(context, args);    }  };};
```

节流函数输入一个函数并返回一个函数（高阶函数）。节流使用闭包，保存上一次触发回调的时间(last)，执行函数(fn)，时间阀值(interval)，在要执行 fn 时，当前时间与上一次触发时间进行比较，如果时间间隔大于 interval(now - last >= interval)，执行函数 fn.apply(context, args)。

**防抖**

```js
// fn是我们需要包装的事件回调, delay是每次推迟执行的等待时间function debounce(fn, delay) {  let timer = null; // 定时器  return function () {    // 将debounce处理结果当作函数返回    let context = this; // 保留调用时的this上下文    let args = arguments; // 保留调用时传入的参数    if (timer) {      // 每次事件被触发时，都去清除之前的旧定时器      clearTimeout(timer);    }    timer = setTimeout(function () {      // 设立新定时器      fn.apply(context, args);    }, delay);  };}
```

### 怎么判断两个对象相等？

> 可以转换为字符串来判断

```
    JSON.stringify(obj1)==JSON.stringify(obj2);//true or false
```

### ⽤过哪些设计模式？

- ⼯⼚模式：
  - ⼯⼚模式解决了重复实例化的问题，但还有⼀个问题,那就是识别问题，因为根本⽆法
  - 主要好处就是可以消除对象间的耦合，通过使⽤⼯程⽅法⽽不是 new 关键字
- 构造函数模式
  - 使⽤构造函数的⽅法，即解决了重复实例化的问题，⼜解决了对象识别的问题，该模式 与⼯⼚模式的不同之处在于
  - 直接将属性和⽅法赋值给 this 对象;

### JS 的四种设计模式

> 1. 工厂模式：简单的工厂模式可以理解为解决多个相似的问题
>
> ```js
> function CreatePerson(name, age, sex) {
>   var obj = new Object();
>   obj.name = name;
>   obj.age = age;
>   obj.sex = sex;
>   obj.sayName = function () {
>     return this.name;
>   };
>   return obj;
> }
> var p1 = new CreatePerson("hxs", 24, "男");
> var p2 = new CreatePerson("wsq", 23, "女");
> console.log(p1, p2);
> ```
>
> 2. 单例模式：只能被实例化(构造函数给实例添加属性与方法)一次
>
> ```js
> var Singleton = function (name) {
>   this.name = name;
> };
> Singleton.prototype.getName = function () {
>   return this.name;
> };
> var getInstance = (function () {
>   var instance = null;
>   return function (name) {
>     if (!instance) {
>       instance = new Singleton(name);
>     }
>     return instance;
>   };
> })();
> var a = getInstance("aa");
> var b = getInstance("bb");
> console.log(a, b); // 只能实例化一次所有name均为aa
> ```
>
> 3. 沙箱模式： 将一些函数放到自执行函数里面，但是用闭包暴露接口，用变量来接收暴露的接口，再调用里面的值，否则无法使用里面的值
>
> ```js
> let sandBosModel = (function () {
>   function sayName(name) {
>     return name;
>   }
>   function sayAge(age) {
>     return age;
>   }
>   return { sayName: sayName, sayAge: sayAge };
> })();
> console.log(sandBosModel.sayName("hxs"));
> ```
>
> 4. 发布者订阅模式：例如我们关注了一个公众号，然后他对应的有新的消息就会推送
>
> ```js
> //发布者与订阅模式var shoeObj = {}; // 定义发布者shoeObj.list = []; // 缓存列表 存放订阅者回调函数// 增加订阅者shoeObj.listen = function (fn) {  shoeObj.list.push(fn); // 订阅消息添加到缓存列表};// 发布消息shoeObj.trigger = function () {  for (var i = 0, fn; (fn = this.list[i++]); ) {    fn.apply(this, arguments); //第一个参数只是改变fn的this,  }};// 小红订阅如下消息shoeObj.listen(function (color, size) {  console.log("颜色是：" + color);  console.log("尺码是：" + size);});// 小花订阅如下消息shoeObj.listen(function (color, size) {  console.log("再次打印颜色是：" + color);  console.log("再次打印尺码是：" + size);});shoeObj.trigger("红色", 40);shoeObj.trigger("黑色", 42);
> ```

### 十七、柯里化

如何实现 multi(2)(3)(4)=24?脑海中首先浮现的解决方案是，闭包。

```js
function multi(a) {
  return function (b) {
    return function (c) {
      return a * b * c;
    };
  };
}
```

上面的实现方案存在的缺陷：代码不够优雅，实现步骤需要一层一层的嵌套函数。可扩展性差，假如是要实现 multi(2)(3)(4)...(n) 这样的功能，那就得嵌套 n 层函数。更好的解决方案使用函数式编程中的函数柯里化实现。柯里化是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术。

```js
//普通函数function fn(a,b,c,d,e) {console.log(a,b,c,d,e)}//用于将普通函数转化为柯里化版本的工具函数function curry(fn) {//...内部实现省略，返回一个新函数}let _fn = curry(fn);//生成的柯里化函数_fn(1,2,3,4,5);     // print: 1,2,3,4,5_fn(1)(2)(3,4,5);   // print: 1,2,3,4,5
```

#### 用途

我们工作中会遇到各种需要通过正则检验的需求，比如校验电话号码、校验邮箱、校验身份证号、校验密码等， 这时我们会封装一个通用函数 checkByRegExp ,接收两个参数，校验的正则对象和待校验的字符串

```js
function checkByRegExp(regExp, string) {
  return regExp.test(string);
}
checkByRegExp(/^1\d{10}$/, "18642838455"); // 校验电话号码checkByRegExp(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/, "test@163.com"); // 校验邮箱
```

我们可能会这样做：

```js
checkByRegExp(/^1\d{10}$/, "18642838455"); // 校验电话号码checkByRegExp(/^1\d{10}$/, "13109840560"); // 校验电话号码checkByRegExp(/^1\d{10}$/, "13204061212"); // 校验电话号码
```

我们每次进行校验的时候都需要输入一串正则，再校验同一类型的数据时，相同的正则我们需要写多次， 这就导致我们在使用的时候效率低下，并且由于 checkByRegExp 函数本身是一个工具函数并没有任何意义， 一段时间后我们重新来看这些代码时，如果没有注释，我们必须通过检查正则的内容， 我们才能知道我们校验的是电话号码还是邮箱，还是别的什么。此时，我们可以借助柯里化对 checkByRegExp 函数进行封装，以简化代码书写，提高代码可读性。

```js
let _check = curry(checkByRegExp); //进行柯里化let checkCellPhone = _check(/^1\d{10}$/); //生成工具函数，验证电话号码let checkEmail = _check(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/); //生成工具函数，验证邮箱checkCellPhone("18642838455"); // 校验电话号码checkCellPhone("13109840560"); // 校验电话号码checkCellPhone("13204061212"); // 校验电话号码
```

#### 封装柯里化

```js
function curry(func) {  return function curried(...args) {    if (args.length >= func.length) {      // 通过函数的length属性，来获取函数的形参个数      return func.apply(this, args); // 符合执行条件，执行计算    } else {      return function (...args2) {        return curried.apply(this, args.concat(args2)); // 收集传入的参数，进行缓存      };    }  };}
```

### 编译器和解析器：V8 如何执行一段 JavaScript 代码的

https://blog.poetries.top/browser-working-principle/guide/part3/lesson14.html#%E7%BC%96%E8%AF%91%E5%99%A8%E5%92%8C%E8%A7%A3%E9%87%8A%E5%99%A8

要深入理解 V8 的工作原理，你需要搞清楚一些概念和原理，比如接下来我们要详细讲解的编译器（Compiler）、解释器（Interpreter）、抽象语法树（AST）、字节码（Bytecode）、即时编译器（JIT）等概念

#### 编译器和解释器

之所以存在编译器和解释器，是因为机器不能直接理解我们所写的代码，所以在执行程序之前，需要将我们所写的代码“翻译”成机器能读懂的机器语言。按语言的执行流程，可以把语言划分为编译型语言和解释型语言。编译型语言需要经过编译器的编译过程，并且编译之后会直接保留机器能读懂的二进制文件，而不需要再次重新编译了。比如 C/C++、GO 。而由解释型语言编写的程序，在每次运行时都需要通过解释器对程序进行动态解释和执行。比如 Python、JavaScript 。<img src="pic\19.png" alt="img" style="zoom: 50%;" />

从图中你可以看出这二者的执行流程，大致可阐述为如下：

1. 在编译型语言的编译过程中，编译器首先会依次对源代码进行词法分析、语法分析，生成抽象语法树（AST），然后是优化代码，最后再生成处理器能够理解的机器码
2. 在解释型语言的解释过程中，同样解释器也会对源代码进行词法分析、语法分析，并生成抽象语法树（AST），不过它会再基于抽象语法树生成字节码，最后再根据字节码来执行程序、输出结果。

#### V8 是如何执行一段 JavaScript 代码的<img src="http://blog.poetries.top/img-repo/2019/11/20.png" alt="img" style="zoom: 50%;" />

1. 生成抽象语法树（AST）和执行上下文

高级语言是开发者可以理解的语言，但是让编译器或者解释器来理解就非常困难了。对于编译器或者解释器来说，它们可以理解的就是 AST 了。所以无论你使用的是解释型语言还是编译型语言，在编译过程中，它们都会生成一个 AST。通常，生成 AST 需要经过两个阶段。

第一阶段是分词（tokenize），又称为词法分析，其作用是将一行行的源码拆解成一个个 token。所谓 token，指的是语法上不可能再分的、最小的单个字符或字符串。其中关键字“var”、标识符“myName” 、赋值运算符“=”、字符串“极客时间”四个都是 token<img src="http://blog.poetries.top/img-repo/2019/11/22.png" alt="img" style="zoom: 25%;" />

第二阶段是解析（parse），又称为语法分析，其作用是将上一步生成的 token 数据，根据语法规则转为 AST。有了 AST 后，那接下来 V8 就会生成该段代码的执行上下文。

2. 生成字节码

有了 AST 和执行上下文后，那解释器就登场了，它会根据 AST 生成字节码，并解释执行字节码。

3. 执行代码

生成字节码之后，接下来就要进入执行阶段了。如果有一段第一次执行的字节码，解释器会逐条解释执行。如果发现有热点代码即一段代码被重复执行多次，那么编译器就会把该段热点的字节码编译为高效的机器码，然后当再次执行这段被优化的代码时，只需执行编译后的机器码，提升了代码的执行效率。<img src="http://blog.poetries.top/img-repo/2019/11/24.png" alt="img" style="zoom: 33%;" />

## Web 相关篇

### 9. 常⻅ web 安全及防护原理

- sql 注⼊原理
  - 就是通过把 SQL 命令插⼊到 Web 表单递交或输⼊域名或⻚⾯请求的查询字符串，最终 达到欺骗服务器执⾏恶意的 SQL 命令
- 总的来说有以下⼏点
  - 永远不要信任⽤户的输⼊，要对⽤户的输⼊进⾏校验，可以通过正则表达式，或限制⻓ 度，对单引号和双 "-" 进⾏转换等 永远不要使⽤动态拼装 SQL，可以使⽤参数化的 SQL 或者直接使⽤存储过程进⾏数据查询存取
  - 永远不要使⽤管理员权限的数据库连接，为每个应⽤使⽤单独的权限有限的数据库连接
  - 不要把机密信息明⽂存放，请加密或者 hash 掉密码和敏感的信息

**XSS 原理及防范**

- Xss(cross-site scripting) 攻击指的是攻击者往 Web ⻚⾯⾥插⼊恶意 html 标签或 者 javascript 代码。⽐如：攻击者在论坛中放⼀个看似安全的链接，骗取⽤户点击后， 窃取 cookie 中的⽤户私密信息；或者攻击者在论坛中加⼀个恶意表单，当⽤户提交表单 的时候，却把信息传送到攻击者的服务器中，⽽不是⽤户原本以为的信任站点

**XSS 防范⽅法**

- ⾸先代码⾥对⽤户输⼊的地⽅和变量都需要仔细检查⻓度和对 ”<”,”>”,”;”,”’” 等字符 做过滤；其次任何内容写到⻚⾯之前都必须加以 encode，避免不⼩⼼把 html tag 弄出 来。这⼀个层⾯做好，⾄少可以堵住超过⼀半的 XSS 攻击

**XSS 与 CSRF 有什么区别吗？**

- XSS 是获取信息，不需要提前知道其他⽤户⻚⾯的代码和数据包。 CSRF 是代替⽤户完成 指定的动作，需要知道其他⽤户⻚⾯的代码和数据包。要完成⼀次 CSRF 攻击，受害者必 须依次完成两个步骤
- 登录受信任⽹站 A ，并在本地⽣成 Cookie
- 在不登出 A 的情况下，访问危险⽹站 B

**CSRF 的防御**

- 服务端的 CSRF ⽅式⽅法很多样，但总的思想都是⼀致的，就是在客户端⻚⾯增加伪随机数
- 通过验证码的⽅法

### 10. WebSocket

> 由于 http 存在⼀个明显的弊端（消息只能有客户端推送到服务器端，⽽服 务器端不能主动推送到客户端），导致如果服务器如果有连续的变化，这时只 能使⽤轮询，⽽轮询效率过低，并不适合。于是 WebSocket 被发明出来

**相⽐与 http 具有以下有点**

- ⽀持双向通信，实时性更强；
- 可以发送⽂本，也可以⼆进制⽂件；
- 协议标识符是 ws ，加密后是 wss ；
- 较少的控制开销。连接创建后， ws 客户端、服务端进⾏数据交换时，协议控制的数据包 头部较⼩。在不包含头部的情况下，服务端到客户端的包头只有 2~10 字节（取决于数据 包⻓度），客户端到服务端的的话，需要加上额外的 4 字节的掩码。⽽ HTTP 协议每次通信 都需要携带完整的头部；
- ⽀持扩展。ws 协议定义了扩展，⽤户可以扩展协议，或者实现⾃定义的⼦协议。（⽐如⽀ 持⾃定义压缩算法等）
- ⽆跨域问题。

### 11. ajax、axios、fetch 区别 jQuery ajax

**jQuery ajax**

优缺点：

- 本身是针对 MVC 的编程,不符合现在前端 MVVM 的浪潮
- 基于原⽣的 XHR 开发， XHR 本身的架构不清晰，已经有了 fetch 的替代⽅案
- JQuery 整个项⽬太⼤，单纯使⽤ ajax 却要引⼊整个 JQuery ⾮常的不合理（采取个性 化打包的⽅案⼜不能享受 CDN 服务）

**axios** 优缺点：

- 从浏览器中创建 XMLHttpRequest
- 从 node.js 发出 http 请求 ⽀持 Promise API
- 拦截请求和响应
- 转换请求和响应数据
- 取消请求
- ⾃动转换 JSON 数据
- 客户端⽀持防⽌ CSRF/XSRF

**fetch**

优缺点：

- fetcht 只对⽹络请求报错，对 400 ， 500 都当做成功的请求，需要封装去处理
- fetch 默认不会带 cookie ，需要添加配置项
- fetch 不⽀持 abort ，不⽀持超时控制，使⽤ setTimeout 及 Promise.reject 的实 现的超时控制并不能阻⽌请求过程继续在后台运⾏，造成了量的浪费
- fetch 没有办法原⽣监测请求的进度，⽽ XHR 可以

### 12. 项⽬做过哪些性能优化？

- 减少 HTTP 请求数
- 减少 DNS 查询
- 使⽤ CDN
- 避免重定向
- 图⽚懒加载
- 减少 DOM 元素数量
- 减少 DOM 操作
- 使⽤外部 JavaScript 和 CSS
- 压缩 JavaScript 、 CSS 、字体、图⽚等
- 优化 CSS Sprite
- 使⽤ iconfont
- 字体裁剪
- 多域名分发划分内容到不同域名
- 尽量减少 iframe 使⽤
- 避免图⽚ src 为空
- 把样式表放在 link 中
- 把 JavaScript 放在⻚⾯底部

### 13. 负载均衡

> 多台服务器共同协作，不让其中某⼀台或⼏台超额⼯作，发挥服务器的最⼤作 ⽤

- http 重定向负载均衡：调度者根据策略选择服务器以 302 响应请求，缺点只有第⼀次有 效果，后续操作维持在该服务器 dns 负载均衡：解析域名时，访问多个 ip 服务器中的⼀ 个（可监控性较弱）
- 反向代理负载均衡：访问统⼀的服务器，由服务器进⾏调度访问实际的某个服务器，对统 ⼀的服务器要求⼤，性能受到 服务器群的数量

### 14. CDN

> 内容分发⽹络，基本思路是尽可能避开互联⽹上有可能影响数据传输速度和稳 定性的瓶颈和环节，使内容传输的更快、更稳定。

### 15. babel 原理

> ES6、7 代码输⼊ -> babylon 进⾏解析 -> 得到 AST （抽象语法树）-> plugin ⽤ babel-traverse 对 AST 树进⾏遍历转译 ->得到新的 AST 树-> ⽤ babel-generator 通过 AST 树⽣成 ES5 代码
