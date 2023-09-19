const LoginForm = ({handleLogin, username, password, userChange, passChange}) => (
  <form onSubmit={handleLogin}>
    <div>
      username
        <input
        type="text"
        value={username}
        name="Username"
        onChange={userChange}
      />
    </div>
    <div>
      password
        <input
        type="password"
        value={password}
        name="Password"
        onChange={passChange}
      />
    </div>
    <button type="submit">login</button>
  </form>      
)

export default LoginForm