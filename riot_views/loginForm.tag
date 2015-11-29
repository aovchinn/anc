<login-form>
    <div class="progress" if={state.loading}>
        <div class="indeterminate"></div>
    </div>
    <form id="login-form" method="post">
        <div class="row">
            <div class="input-field col s10 offset-s1">
                <input id="email" name="username" type="email" onblur={ setEmail }/>
                <label for="email">Email</label>
            </div>
        </div>
        <div class="row">
            <div class="input-field col s10 offset-s1">
                <input id="password" type="password" name="password" onblur={ setPassword }/>
                <label for="password">Password</label>
            </div>
        </div>
        <div class="row">
            <div class="input-field col s5 offset-s1">
                <div class="waves-effect waves-light btn" onclick={ submit }>
                    Submit
                </div>
            </div>
            <div class="input-field col s5">
                <input id="rememberMe" type="checkbox" name="rememberMe" onchange={ toggleRememberMe }/>
                <label for="rememberMe">Remember me</label>
            </div>
        </div>
    </form>

    <style>
        .toast.warning{
            background-color: #e53935;
        }
    </style>
    <!-- this script tag is optional -->
    <script type="text/javascript">
        var loginStore = require('../src/js/redux/login');
        this.state = loginStore.getState();

        this.setEmail = function(){
            var email = this.email.value;
            loginStore.setLogin(email);
        };

        this.setPassword = function() {
            var password = this.password.value;
            loginStore.setPassword(password);
        };

        this.toggleRememberMe = function() {
            var checked = loginStore.getState().rememberMe;
            loginStore.setRememberMe(!checked);
        };

        this.submit = function() {
            loginStore.submit();
            this.state = loginStore.getState();
            if (this.state.errors.length > 0) {
                this.state.errors.forEach(function(error) {
                    Materialize.toast(error, 5000, 'warning');
                });
            } else {
                $('#login-form').submit();
            }
        };
    </script>
</login-form>
