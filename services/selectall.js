(function(){

  function num_selected(link) {

    var num_selected = 0;

    for (var i=0; i<link.slaves.length; i++) {

      var slave = link.slaves[i];

      if (link.isChecked(slave))

        num_selected++;

    }

    return num_selected;

  }

  with (angular.module('selectAll', [])) {

    factory('$selectall', [function() {

      var links = {};

      return {

        bind: function(name, master, slaves, isChecked, setChecked) {

          if (typeof links[name] != 'undefined') {

            alert('selectall: link already registered: ' + name);

            return;

          }

          links[name] = {

            master : master,

            slaves : slaves,

            isChecked : isChecked,

            setChecked : setChecked

          };

        },

        masterClicked: function(name) {

          if (typeof links[name] == 'undefined') {

            alert('selectall: no such link registered: ' + name);

            return;

          }

          var link = links[name];

          link.master.checked = link.slaves.length > 0 && !link.master.checked;

          for (var i=0; i<link.slaves.length; i++) {

            var slave = link.slaves[i];

            link.setChecked(slave, link.master.checked);

          }

        },

        slaveClicked: function(name) {

          if (typeof links[name] == 'undefined') {

            alert('selectall: no such link registered: ' + name);

            return;

          }

          var link = links[name];

          link.master.checked = (link.slaves.length > 0 && num_selected(link) == link.slaves.length);

        }

      }

    }]);

  }

})();
