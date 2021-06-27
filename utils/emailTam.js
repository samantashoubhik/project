exports.activeAccount = (username, code) =>
  `<body
    style="
      width: 80%;
      margin: 0 auto;
      border: 1px solid whitesmoke;
      padding: 50px;
      border-radius: 5px;
      font-family: monospace;
      font-size: 15px;
      line-height: 2;
    "
  >
    <div class="div">
      <h2 style="color: #3b5998; margin: 0;">Story Books</h2>
      <hr style="height: 1px; border: 0px solid; background: whitesmoke;" />
      <br />
      <p style="font-weight: bold;">Hi ${username},</p>
      <p>
        We received a request to reset your Story Books password.
        <br/>
         Enter the following password reset code:
      </p>
      <div
        class="button"
        style="
          background: whitesmoke;
          padding: 10px;
          font-weight: 200;
          letter-spacing: 2px;
          font-size: 18px;
          border-radius: 4px;
          width: fit-content;
        "
      >
        ${code}
      </div>
    </div>
  </body>
`;
