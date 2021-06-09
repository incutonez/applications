import Sorter from '@/classes/Sorter';
import {FlexDirections, TextAlignments} from '@/statics/Flex';

export default interface IColumn {
  cls: Array<string>;
  text: string;
  type: number;
  field: string;
  rowSpan: number;
  colSpan: number;
  columns?: IColumn[];
  isParent: boolean;
  isAssociation: boolean;
  isSortable: boolean;
  isSorted: boolean;
  sorter?: Sorter;
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  formatter: string | ((value: any, record: any) => {});
  flex: number;
  shrink: number;
  basis: string | number;
  cellCls: string;
  width: number | string;
  direction: FlexDirections;
  align: TextAlignments;
  hidden: boolean;
}
