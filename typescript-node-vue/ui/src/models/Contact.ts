import Model, {IAssociations} from '@/classes/Model';
import IContact from '@/interfaces/IContact';
import Company from '@/models/Company';
import Application from '@/models/Application';

interface Contact extends IContact {

}

class Contact extends Model {
  static proxy = {
    url: 'api/contacts',
    type: 'ajax'
  };

  get associations(): IAssociations | null {
    return {
      Company: {
        type: 'model',
        model: Company,
        key: 'Company'
      },
      Application: {
        type: 'model',
        model: Application,
        key: 'Application'
      }
    };
  }
}

export default Contact;
