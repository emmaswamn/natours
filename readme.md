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

- On tour detail page allow user to add the review
- Implement "My Review" pages (using React)
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

  const { isLoggedIn } = useSelector((store) => store.auth);
  // 问题1，使用diapatch login 和 dispatch logout之后会返回首页
  // 触发 dispatch(getLogStatu()) rerender App；
  // login 和 logout 使 isLoggedIn 触发rerender Header与 rerender App冲突

  // 方法1，Stackover flow 里的建议是用useEffect 包裹dispatch
  // 包裹 dispatch(getLogStatu())， 由于useEffect里的代码在render之后运行
  // 所以 isLoggedIn 初始值是 false
  // 所有protectedroute 会在刷新后回到首页

  // 方法2
  // 阻止 login 触发 dispatch(getLogStatu())
  // if(!isLoggedIn) dispatch(getLogStatu()); login后不会触发
  // 但是在首页logout仍会触发
  // 使用useMemo,仅当 isLoggedIn 变化时才会运行函数， 但不会发生render冲突
  // 非首页logout 会进入not found页面

  // 方法2.1
  // 有的时候会发生，有的时候不会发生，所以我给了protect router一个延迟
  // 有1s的时间再返回'/' 无效
  // 在app 首次logout 会warning, 非首次不会warning

  const getLog = () => {
    if(!isLoggedIn) {
      console.count('app');
      dispatch(getLogStatu())
    };
  };

  const getLog2 = useMemo(() => getLog(), [isLoggedIn]);

```

### Pending

- None at the moment
