import { SelectionService } from './selection.service';

describe('SelectionService', () => {
    let sut;
    let collectionName;
    const item = Symbol('item');
    const item1 = Symbol('item1');


    beforeEach(() => {
      collectionName = 'filterType';
      sut = new SelectionService(collectionName);
    });

    describe('selection', () => {

        beforeEach(() => {
          sut.clearAll();
        });

        it('should add item to selected', () => {
            sut.select(item);
            expect(sut[collectionName].has(item)).toBeTruthy();
        });

        it('should delete selected', () => {
            sut.select(item);
            sut.deselect(item);
            expect(sut[collectionName].has(item)).toBeFalsy();
        });

        it('should clear selected', () => {
            sut[collectionName].add(item);
            sut.clearAll();
            expect(sut[collectionName].has(item)).toBeFalsy();
        });

        it('should check selection', () => {
            sut[collectionName].add(item);
            expect(sut.isSelected(item)).toBeTruthy();
        });

        it('should get selected items', () => {
            sut[collectionName].add(item);
            expect(sut.getSelected()).toEqual(sut[collectionName]);
        });

        it('should select all', () => {
            sut.selectAll([item,item1]);
            expect(sut.isSelected(item)).toBeTruthy();
            expect(sut.isSelected(item1)).toBeTruthy();
        });

        it('should deselect all', () => {
            sut[collectionName].add(item);
            sut.deselectAll([item]);
            expect(sut.isSelected(item1)).toBeFalsy();
        });

        it('should check whether items are selected', () => {
          sut[collectionName].add(item);
          sut[collectionName].add(item1);

          expect(sut.isAllSelected([item,item1])).toBeTruthy();
        });

        it('should check whether items are deselected', () => {
            sut[collectionName].add(item);
            sut[collectionName].add(item1);
            sut.deselectAll([item,item1]);
            expect(sut.isAllDeselected([item,item1])).toBeTruthy();
        });
    });
});
