Ext.define('JefBox.view.users.MainView', {
  extend: 'JefBox.view.BaseCrudView',
  alias: 'widget.usersMainView',
  requires: [
    'JefBox.view.users.MainViewController',
    'JefBox.store.Users'
  ],

  controller: {
    type: 'usersView'
  },
  viewModel: {
    stores: {
      mainStore: JefBox.store.Users
    }
  },

  NAME_DATAINDEX: 'UserName',

  getColumnsConfig: function() {
    var config = this.callParent();
    Ext.Array.insert(config, 3, [{
      text: 'Active',
      dataIndex: 'IsActive',
      align: 'center',
      width: 70,
      cell: {
        encodeHtml: false
      },
      renderer: function(value) {
        let colorCls = Styles.COLOR_FAILURE;
        let iconCls = Icons.CROSS;
        if (value) {
          iconCls = Icons.CHECKMARK;
          colorCls = Styles.COLOR_SUCCESS;
        }
        return Icons.getIconMarkup({
          iconCls: iconCls,
          colorCls: colorCls
        });
      }
    }, {
      text: 'Access Level',
      dataIndex: 'accessLevelDisplay',
      width: 110
    }]);
    return config;
  }
});