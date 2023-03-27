<template>
  <div class="wrappers">
    <div>
      <div class="title">
        <div>
        <h2>Sign Up</h2>
        <p>Please fill in this form to create an account.</p>
        </div>
      </div>
      <div class="input">
        <label for="email">Email</label><br />
        <input id="email" type="text" placeholder="Enter email" required>
      </div>
      <div class="input">
        <label for="password">Username</label><br />
        <input id="password" type="text" placeholder="Username" required>
      </div>
      <div class="input">
        <label for="password">First name</label><br />
        <input id="password" type="text" placeholder="First name" />
      </div>
      <div class="input">
        <label for="password">Last name</label><br />
        <input id="password" type="text" placeholder="Last name" />
      </div>
      <div class="input">
        <label for="password">Password</label><br />
        <input id="password" type="text" placeholder="Create your password" />
      </div>
      <div class="input">
        <button id="login" onclick="login();">Login</button>
      </div>
    </div>
  </div>
</template>

<style>
.wrappers {
  display: block;
  width: 500px;
  border: 1px solid gray;
  padding: 20px;
  text-align: center;
}
.title {
  display: flex;
  text-align: left;
  border-bottom: 1px solid gray;
  margin-bottom: 10px;
}
.input {
  text-align: left;
}
.input input {
  width: 100%;
  height: 50px;
  padding-left: 10px;
  margin: 10px 10px 10px 0px;
}
.input button {
  width: 100%;
  height: 50px;
  margin-top: 10px;
  border: 0px solid black;
  color: white;
  background-color: green;
}
.content p {
  margin-top: 10px;
}
.content button {
  margin-left: 10px;
  width: 90px;
  height: 25px;
  color: white;
  background-color: gray;
  border: 0px;
  border-radius: 2px;
  margin-top: 5px;
}
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

