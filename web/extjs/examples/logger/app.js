Ext.Loader.setConfig({
  enabled: true
});
Ext.require('TestPanel');
Ext.onReady(function() {
  Ext.create('TestPanel', {
    title: 'TestPanel',
    renderTo: Ext.getBody(),
    height: 300,
    width: 300
  });
});