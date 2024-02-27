document.querySelector('.navbar-toggle').addEventListener('click', function() {
    document.querySelector('.navbar-nav').style.display = 
      document.querySelector('.navbar-nav').style.display === 'none' ? 'flex' : 'none';
  });