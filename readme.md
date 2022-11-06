# Natours

## About

This is a complete full-stack application with a RESTful API and a server-side rendered website.  
All the backend api has done. If you only want to contribute the front-end, You could find the Insomnia api doc 'insomnia-api-result'.  
If you are not familiar with Insomnia(a free app like postman), you could  
check my blog.  
Chinese:https://juejin.cn/post/7148715672250351646/  
English:https://dev.to/emmaswamn/basic-usage-of-insomnia-4ibl

## Possible Improvements

:white_check_mark: Implement a sign up form
:white_check_mark: Refactor front-end pages using React

- On tour detail page allow user to add the review
- Implement restriction to users review only tours they have booked
- Implement maximum login attempts
- Implement two-factor authentication
- Implement the "Manage" page for administrators to CRUD tours, users, reviews and bookings

#### Concurrently

- front-end and backend (server)
- run separate terminals
- [concurrently](https://www.npmjs.com/package/concurrently)

```sh
npm install concurrently --save-dev

```

## Bugs and Delays

- React Warning

```js
// Warning: Cannot update a component (`Header`) while rendering a different component
function App() {
  const dispatch = useDispatch();

  const { isLoggedIn, firstLoad } = useSelector((store) => store.auth);

  if(!isLoggedIn && firstLoad) {
    console.count('first');
    dispatch(getLogStatu());
    dispatch(trunOfffirst());
  };

  useEffect(() => {
    if(!isLoggedIn) {
      console.count('app');
      dispatch(getLogStatu());
    };
  })
  // 问题描述：使用diapatch login 和 dispatch logout之后会返回首页
  // 触发 dispatch(getLogStatu()) rerender App；
  // login 和 logout 使 isLoggedIn 触发rerender Header与 rerender App冲突

  // 解决思路：Stackover flow 里的建议是用useEffect 包裹dispatch
  // dispatch(getLogStatu())， 但是useEffect里的代码在render之后运行
  // 所以 isLoggedIn 初始值是 false
  // 所有protectedroute 会在刷新后回到首页

  // 解决方法：
  // 1. 添加 firstLoad 变量， 我们只需要首次载入的时候，在render之前发起请求
  // 2. 用useEffect包裹请求，非首次载入时，触发这个请求
  // 目前没有找到比这个干净的方法。

```

### Pending

- None at the moment
