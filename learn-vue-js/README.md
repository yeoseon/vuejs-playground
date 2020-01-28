# learn-vue-js

[인프런 - Vue.js 시작하기](https://www.inflearn.com/course/Age-of-Vuejs/)  
[강의 리포](https://github.com/joshua1988/learn-vue-js)  

## 개발 환경 설정

### 단축키  
* VS Code 사이드바 Toggle : Command + \  
* Chrome 개발자 도구 Toggle : Command + option + I  


### Visual Code Plug-in  

* Vetur: Vue tooling for VS Code  
* Material Icon Theme: VS Code 아이콘을 Material 테마 아이콘으로 세팅해줌.  
* Night Owl: 코드 강조 플러그인
* Live Server: 로컬 서버
vue-cli를 배우기 전까지 일일히 html 파일을 생성하여 연습할 것이다. 이를 브라우저로 띄우지 않고, VS Code 내부의 서버를 통해 실행할 수 있도록 하는 것  
[Open with Live Server]를 통해 실행한다.  
파일이 수정될 경우, 자동으로 브라우저가 Refresh 되면서 반영된다.  
* ESLint
* Prettier
* Auto Close Tag: HTML/XML의 닫히는 태그를 자동으로 작성하게 해주는 플러그인  
~~느낌표를 작성 후 엔터를 클릭하면 전체 초기 Set이 입력되기도 한다.
만들고자 하는 태그와 아이디를 입력하면, 자동으로 입력해주기도 한다.~~ **이건 Emmet 이라는 VS Code 내장 플러그인이 해주는 것임**  
예시) ```div#app```입력 후 Enter를 치면 다음 내용이 자동으로 Set 된다.  
```
<div id="app">
</div>
```
* Atom Keymap  

### Vue 개발자도구 (Chrome Extension)

> Components, Vuex, Events 등의 기능으로 구성되어 있다.  

## Vue.js 소개

### MVVM 모델에서의 Vue

Vue.js 1.x 공식문서에 있는 이미지  
![Vue는 무엇인가](./assets/01.png)  

> Vue.js의 두 가지 큰 특징  
> **DOM Listeners**  
> **Data Bindings**

* View  
사용자에게 비춰지는 화면 (입력박스, 버튼 등)  
화면에 보여지는 요소들을 HTML  
DOM을 이용해서 JavaScript를 통해 조작을 할 수 있게 구성됨  

* DOM Listeners
화면에서 사용자가 이벤트를 조작했을 때, **DOM Listeners**를 통해 Vue에서 해당 이벤트를 청취하게 된다.  
그 후, JavaScript에 있는 데이터를 바꿔줌.  

* Data Bindings
JavaScript 데이터가 바뀌게 되었을 때, **Data Bindings**를 타게 된다.  
해당 변경된 내용을 Data Bindings를 통해 화면에 바로 반영되게 된다.  


### 기존 웹 개발 방식 (HTML, Javascript)

[playground/web-dev.html](./playground/web-dev.html) 파일 참고  

* HTML : 화면에 나타나는 태그나 DOM의 정보를 넣는다.  
* Javascript : 해당 태그나 DOM의 데이터를 조작하는 역할을 수행한다.  

```
        var str = 'Hello world';
        div.innerHTML = str;

        str = 'Hello world!!!';
        div.innerHTML = str;
```

내가 다루고 싶은 데이터 ```str```을 하나 선언하여 ```innerHTML``` 을 통해 조작을 한 후에,  
```str``` 변수의 값을 바꾸더라도, 바로 반영이 되지 않는다.  
한번 더 ```innerHTML```을 수행해서 다시 대입을 해주어야 반영이 된다.  


### Reactivity 구현  

[playground/vue-way.html](./playground/vue-way.html) 파일 참고  

> MDN(Mozilla Developer Network) : JavaScript 등의 기본 웹 기술에 관련한 기본 정보와 스펙을 관리하는 곳  
> 모든 문법과 예제를 보고 웹 개발을 하는 것이 좋다.  

[```Object.defineProperty()```](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty): 객체의 특정 속성의 동작을 재정의 하는 API  

**Vue의 핵심 Reactivity(반응성)**  

```
        var div = document.querySelector('#app');
        // div.innerHTML = 'hello world';
        var viewModel = {};

        //Object.defineProperty(대상객체, 객체의 속성, {정의할 내용})
        Object.defineProperty(viewModel, 'str', {
            // 속성의 접근했을 때의 동작 정의
            get: function() {
                // console.log(viewModel.str); 처럼 해당 속성에 접근했을 때

                console.log('접근');
            },
            // 속성에 값을 할당했을 때의 동작 정의 
            set: function(newValue) {
                console.log('할당', newValue);
                div.innerHTML = newValue;
            }
        })
```

```viewModel.str```에 값을 새로 할당할 때마다, ```innerHTML```을 통해 다시 반영해줄 필요 없이 바로 반영이 되는 것을 볼 수 있다.  
**데이터의 변화를 라이브러리에서 감지해서 알아서 화면에 자동으로 그려주는 것 -> Data Binding**  


### Reactivity 코드 라이브러리화 하기  

> 위의 defineProperty 부분을 라이브러리화 해보자.  

```init()``` 메소드와 ```render()``` 메소드로 분리하여 [Javascript의 즉시실행함수](https://github.com/yeoseon/tip-archive/issues/43) 안에 위치시키기  
다음과 같은 구조로 정의된다.  
```
        (function() {
            function init() {
                //Object.defineProperty(대상객체, 객체의 속성, {정의할 내용})
                Object.defineProperty(viewModel, 'str', {
                    // 속성의 접근했을 때의 동작 정의
                    get: function() {
                        // console.log(viewModel.str); 처럼 해당 속성에 접근했을 때
                        console.log('접근');
                    },
                    // 속성에 값을 할당했을 때의 동작 정의 
                    set: function(newValue) {
                        console.log('할당', newValue);
                        render(newValue);
                    }
                })

            function render(value) {
                div.innerHTML = value;
            }

            init();
        })();
```

* 즉시실행함수의 역할  
```init()```과 ```render()```가 외부에 노출되지 않게 또 다른 [Scope](https://github.com/yeoseon/tip-archive/issues/44)에 넣어준다.  
**일반적으로 오픈소스 라이브러리들은 이런 식으로 [변수의 유효범위](https://github.com/yeoseon/tip-archive/issues/44)를 관리하고 있다.**  


### Hello Vue.js와 뷰 개발자 도구  

> 위에서 구현했던 구조를 Vue.js를 통해서는 어떤 식으로 동작하는지 Helloworld 부터 시작해본다.  

[complete/getting-started/index.html](https://github.com/joshua1988/learn-vue-js/blob/master/getting-started/index.html) 파일 참고  

해당 파일을 [Open with Live Server]를 통해 띄워보자  

**Vue 개발자 도구**  
* Components  
Vue.js를 시작했을 때에 구성되는 기본적인 Component 구조도가 나옴  
message를 수정해줄 경우, 앞에서 구현한 Reactivity 로직이 내장되어 있어 화면에 바로 반영되는 것을 볼 수 있음.  

## 인스턴스  

### 인스턴스 소개  

[playground/instance.html](./playground/instance.html) 파일 참고  

Vue로 개발할 때 필수로 생성해야하는 개발 단위  
Vue가 여러 API과 속성을 제공하여 개발하기 쉽게 제공하고 있다.  

```
new Vue();
````

```#app```이라는 Tag를 찾아서 이 Vue 인스턴스를 붙히겠다는 선언  
이렇게 붙히는 순간, 해당 태그 안에서 Vue 관련 API와 속성을 사용할 수 있게 된다.  
element를 무조건 지정해줘야 한다.  
```
var vm = new Vue({
    el: '#app',
    data: {
        message: 'hi'
    }
});
```

### 인스턴스와 생성자 함수  

> 왜 인스턴스를 생성해서 사용하는지 생성자 함수와 함께 알아보자.  

기본적으로 Javascript를 이용하여 인스턴스를 생성하는 방법 중 하나 : 생성자 함수를 이용하는 것  

함수이름이 대문자로 시작한다 : 생성자 함수이다.  

```
function Person(name, job) {
    this.name = name;
    this.job = job;
}
```

```
var p = new Person('josh', 'developer');
```

Vue 생성자를 미리 정의해놓기
```
function Vue() {
    this.logText = function() {
        console.log('hello');   
    }
}
```

다음과 같이 미리 정의를 해놓으면, 우리가 Vue 인스턴스를 하나 생성할 때마다 위에 정의해놓은 기능이 장착되게 된다.  

```
var vm = new Vue();
```

매번 함수를 구햔하는 것이 아니라, 미리 이렇게 구현을 해놓을 수 있다.  
그래서 생성자 함수로 Vue에서 API와 속성을 미리 정의해놓고, 우리가 갖다 쓰거나 재사용하게 되는 패턴을 가지게 된다.  
이게 new Vue를 사용하는 이유이다.  

[생성자 함수 사용](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Obsolete_Pages/Core_JavaScript_1.5_Guide/Creating_New_Objects/Using_a_Constructor_Function) 참고  
[Prototype 설명 문서](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor) 참고  

### 인스턴스 옵션 속성  

> 생성자 함수로 재사용할 수 있는 옵션과 속성에 대해 알아보자.  

다음과 같은 속성과 API를 사용할 수 있다.  
**Vue 객체에 key-value 형태로 값이 관리된다는 점이 중요하다.**  
```
new Vue({
    el:,
    template:,
    data:,
    methods:,
    created:,
    watch:,
});
```

[playground/instance.html](./playground/instance.html) 파일 계속

```
var options = {
    el: '#app',
    data: {
        message: 'hi'
    }
 };

var vm = new Vue(options);
```

다음과 같이 별도의 변수를 선언하여 생성자 함수에 넣어주는 것도 좋지만, 위의 방법 처럼 **객체 리터럴** 방식을 사용하여 객체를 바로 넣어주는 것이 가독성에 있어서 더 좋다.  

[Javascript 객체 생성 방식](https://github.com/yeoseon/tip-archive/issues/47) 참고  

> 생성자 안에 들어가는 것은 **객체**이고, 해당 표기법을 사용해야 한다는 것을 인지한다.


## 컴포넌트  

### 컴포넌트 소개  