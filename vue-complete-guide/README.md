# vue-complete-guide

[인프런 - Vue.js 완벽가이드](https://www.inflearn.com/course/vue-js/dashboard)  

[비공개 리포지토리 주소](https://github.com/joshua1988/vue-advanced)  

[Vue.js 스타일 가이드 링크](https://vuejs.org/v2/style-guide/)  

**VSCode 플러그인 리스트**  
* Atom Keymap : 아톰의 키 설정을 불러오는 플러그인  
* Vetur : Vue.js 플러그인(SPA 개발을 위한 자동완성 등 기능 지원)  
* Night Owl : 코드 하이라이팅 플러그인  
* Material Dark Syntax : 코드 하이라이팅 플러그인  
* Google Material Icon Theme : 폴더 아이콘 테마  
* ESLint : 자바스크립트 문법 검사 플러그인  
* TSLint : 타입스크립트 문법 검사 플러그인. 타입 스크립트를 사용하지 않아도 기본적인 타입에 대한 검사를 해주므로 사용한다.  
* Auto Close tag : HTML 태그 자동 닫기 플러그인  
* Live Server : 정적 파일을 로컬 서버에 올리고 자동 갱신해주는 플러그인  

---
# 애플리케이션 제작 

## 소개 및 설계  

### 제작할 사이트 및 API 소개  

[Hacker News](https://news.ycombinator.com/)  
[Heacker News API](https://github.com/tastejs/hacker-news-pwas/blob/master/docs/api.md)  

News, Ask, Jobs

### 애플리케이션 라우터 설계  

여러 페이지로 구성되어 있는 경우 **라우터**를 설계한다.  

News, Ask, Jobs 3개의 페이지가 필요하다.  
각 글 페이지인 Item, 사용자 정보인 User까지 5개의 라우터로 구성한다.  

컴포넌트는 개발을 진행해나가면서 어떤 식으로 구성하면 좋을지 고민한다.  

### 비공개 리포지토리 소개 및 뷰 CLI 설명

### Vue CLI 2.x vs Vue CLI 3.x  

-  명령어  
    - 2.x: ```vue init '프로젝트 템플릿 이름' '파일 위치'```  
    - 3.x: ```vue create '프로젝트 이름'```

- 웹팩 설정 파일 (webpack.config.js)
    - 2.x: 노출 O 
    - 3.x: 노출 X 
        - 웹팩이 상당히 복잡하기 때문에 라이브러리 내부에서 알아서 처리하겠다.
        - 웹팩의 설정을 추가하기 위해 별도의 내용을 추가해줘야 한다.  
        - [Vue-CLI3](https://cli.vuejs.org/)에 webpack을 검색해볼 것 
        - 2버전에 비해 node_modules가 바로 들어와서, ```npm install```을 해줄 필요가 없다.  

- 프로젝트 구성 
    - 2.x: [깃헙의 템플릿](https://github.com/vuejs-templates/webpack-simple) 다운로드 
    - 3.x: 플러그인 기반으로 기능 추가

- ES6 이해도
    - 2.x: 필요 X 
    - 3.x: 필요 O  

## 프로젝트 셋업   

### Vue CLI로 프로젝트 생성 및 ESLint 로그 확인  

Vue CLI 3부터는 npm을 다운 받고 나서 ```npm install```을 바로 수행한다.  

### ESLint 도구 소개와 사용해야 하는 이유?  

#### ESLint   

![image](https://user-images.githubusercontent.com/54384004/75153151-0586b000-574e-11ea-9b22-c95806c53b1f.png)

* JavaScript 코딩 도움말 역할  
* 문법 검사기  

트레일링 콤마 (trailing comma) - ESLint에서는 이 콤마를 항상 찍도록 유도한다.  
```
components: {
    '컴포넌트 이름': 컴포넌트 이름,
}
```

ESLint가 추천하는 코드를 사용하자.  

### Vue CLI 3.x에서 ESLint 설정 끄는 방법  

[vue.config.js를 생성하여 설정한다.](./vue-news/vue.config.js)  
[lintOnSave 페이지 주소](https://cli.vuejs.org/config/#pages)  

## 라우터 기본  

### 라우터 설치 및 라우터 구현  

