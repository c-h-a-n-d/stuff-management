<script>
            function comparePasswords() {
              var newPassword = document.getElementById("new-password").value;
              var confirmPassword = document.getElementById("confirm-password").value;
              if (newPassword != confirmPassword) {
                alert("Passwords do not match!");
                return false;
              }
              return true;
            }
</script>