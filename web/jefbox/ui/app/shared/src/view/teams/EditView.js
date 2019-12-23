Ext.define('JefBox.view.teams.EditView', {
  extend: 'JefBox.BaseDialog',
  alias: 'widget.teamsEditView',
  requires: [
    'JefBox.view.teams.EditViewController',
    'JefBox.model.User'
  ],

  controller: {
    type: 'teamsEditView'
  },
  viewModel: {
    data: {
      viewRecord: null
    },
    formulas: {
      saveBtnDisabled: function(get) {
        return !get('viewRecord.valid');
      }
    },
    stores: {
      usersStore: {
        model: 'JefBox.model.User',
        autoLoad: true
      }
    }
  },

  title: 'Edit Team',
  isCrudDialog: true,
  layout: {
    type: 'vbox'
  },
  items: [{
    xtype: 'container',
    margin: '0 0 10 0',
    layout: {
      type: 'hbox'
    },
    items: [{
      xtype: 'textfield',
      required: true,
      label: 'Name',
      margin: '0 20 0 0',
      bind: {
        value: '{viewRecord.Name}'
      }
    }, {
      xtype: 'textfield',
      label: 'Hex',
      margin: '0 10 0 0',
      inputMask: '#hhhhhh',
      bind: {
        value: '{viewRecord.Color}'
      }
    }, {
      xtype: 'textfield',
      required: true,
      label: 'Color',
      inputType: 'color',
      bind: {
        value: '{viewRecord.Color}'
      }
    }]
  }, {
    xtype: 'container',
    flex: 1,
    layout: {
      type: 'hbox'
    },
    items: [{
      xtype: 'grid',
      title: 'Users',
      flex: 1,
      bind: {
        store: '{viewRecord.Users}'
      },
      plugins: [{
        type: 'gridrowdragdrop'
      }],
      columns: [{
        text: 'Actions',
        cell: {
          tools: [{
            iconCls: Icons.DELETE,
            tooltip: 'Delete User',
            handler: 'onClickDeleteUser'
          }]
        }
      }, {
        text: 'User Name',
        dataIndex: 'UserName',
        flex: 1
      }]
    }, {
      xtype: 'grid',
      title: 'Available',
      margin: '0 0 0 10',
      flex: 1,
      titleBar: {
        items: [{
          xtype: 'button',
          align: 'right',
          tooltip: 'Create User',
          iconCls: Icons.NEW,
          handler: 'onClickCreateUser'
        }]
      },
      bind: {
        store: '{usersStore}'
      },
      plugins: [{
        type: 'gridrowdragdrop'
      }],
      columns: [{
        text: 'User Name',
        dataIndex: 'UserName',
        flex: 1
      }]
    }]
  }]
});