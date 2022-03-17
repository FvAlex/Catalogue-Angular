import { Component } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { CatalogueService } from './first-catalogue.service';
import { TodoItemFlatNode } from './model/catalogue.model';
import { TodoItemNode } from './model/catalogue.model';


@Component({
  selector: 'app-first-catalogue',
  templateUrl: './first-catalogue.component.html',
  styleUrls: ['./first-catalogue.component.scss'],
  providers: [CatalogueService],

})
export class FirstCatalogueComponent{

   /** Map from flat node to nested node. This helps us finding the nested node to be modified */
   flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();

   /** Map from nested node to flattened node. This helps us to keep the same object for selection */
   nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();
 
   /** A selected parent node to be inserted */
   selectedParent: TodoItemFlatNode | null = null;
 
   /** The new item's name */
   newItemName = '';
 
   treeControlFirstTree: FlatTreeControl<TodoItemFlatNode>;
 
   treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;
 
   dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;
 
   /** The selection for checklist */
   checklistSelection = new SelectionModel<TodoItemFlatNode>(true /* multiple */);
 
   constructor(private _database: CatalogueService) {
     this.treeFlattener = new MatTreeFlattener(
       this.transformer,
       this.getLevel,
       this.isExpandable,
       this.getChildren,
     );
     this.treeControlFirstTree = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);
     this.dataSource = new MatTreeFlatDataSource(this.treeControlFirstTree, this.treeFlattener);
 
     _database.dataChange.subscribe(data => {
       this.dataSource.data = data;
     });
   }
 
   getLevel = (node: TodoItemFlatNode) => node.level;
 
   isExpandable = (node: TodoItemFlatNode) => node.expandable;
 
   getChildren = (node: TodoItemNode): TodoItemNode[] => node.children;
 
   hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;
 
   hasNoContent = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.item === '';
 
   /**
    * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
    */
   transformer = (node: TodoItemNode, level: number) => {
     const existingNode = this.nestedNodeMap.get(node);
     const flatNode =
       existingNode && existingNode.item === node.item ? existingNode : new TodoItemFlatNode();
     flatNode.item = node.item;
     flatNode.level = level;
     flatNode.expandable = !!node.children?.length;
     this.flatNodeMap.set(flatNode, node);
     this.nestedNodeMap.set(node, flatNode);
     return flatNode;
   };
 
   /** Whether all the descendants of the node are selected. */
   descendantsAllSelected(node: TodoItemFlatNode): boolean {
     const descendants = this.treeControlFirstTree.getDescendants(node);
     const descAllSelected =
       descendants.length > 0 &&
       descendants.every(child => {
         return this.checklistSelection.isSelected(child);
       });
     return descAllSelected;
   }
 
   /** Whether part of the descendants are selected */
   descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
     const descendants = this.treeControlFirstTree.getDescendants(node);
     const result = descendants.some(child => this.checklistSelection.isSelected(child));
     return result && !this.descendantsAllSelected(node);
   }
 
   /** Toggle the to-do item selection. Select/deselect all the descendants node */
   todoItemSelectionToggle(node: TodoItemFlatNode): void {
     this.checklistSelection.toggle(node);
     const descendants = this.treeControlFirstTree.getDescendants(node);
     this.checklistSelection.isSelected(node)
       ? this.checklistSelection.select(...descendants)
       : this.checklistSelection.deselect(...descendants);
 
     // Force update for the parent
     descendants.forEach(child => this.checklistSelection.isSelected(child));
     this.checkAllParentsSelection(node);
   }
 
   /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
   todoLeafItemSelectionToggle(node: TodoItemFlatNode): void {
     this.checklistSelection.toggle(node);
     this.checkAllParentsSelection(node);
   }
 
   /* Checks all the parents when a leaf node is selected/unselected */
   checkAllParentsSelection(node: TodoItemFlatNode): void {
     let parent: TodoItemFlatNode | null = this.getParentNode(node);
     while (parent) {
       this.checkRootNodeSelection(parent);
       parent = this.getParentNode(parent);
     }
   }
 
   /** Check root node checked state and change it accordingly */
   checkRootNodeSelection(node: TodoItemFlatNode): void {
     const nodeSelected = this.checklistSelection.isSelected(node);
     const descendants = this.treeControlFirstTree.getDescendants(node);
     const descAllSelected =
       descendants.length > 0 &&
       descendants.every(child => {
         return this.checklistSelection.isSelected(child);
       });
     if (nodeSelected && !descAllSelected) {
       this.checklistSelection.deselect(node);
     } else if (!nodeSelected && descAllSelected) {
       this.checklistSelection.select(node);
     }
   }
 
   /* Get the parent node of a node */
   getParentNode(node: TodoItemFlatNode): TodoItemFlatNode | null {
     const currentLevel = this.getLevel(node);
 
     if (currentLevel < 1) {
       return null;
     }
 
     const startIndex = this.treeControlFirstTree.dataNodes.indexOf(node) - 1;
 
     for (let i = startIndex; i >= 0; i--) {
       const currentNode = this.treeControlFirstTree.dataNodes[i];
 
       if (this.getLevel(currentNode) < currentLevel) {
         return currentNode;
       }
     }
     return null;
   }
 
   /** Select the category so we can insert the new item. */
   addNewItem(node: TodoItemFlatNode) {
     const parentNode = this.flatNodeMap.get(node);
     this._database.insertItem(parentNode!, '');
     this.treeControlFirstTree.expand(node);
   }
 
   /** Save the node to database */
   saveNode(node: TodoItemFlatNode, itemValue: string) {
     const nestedNode = this.flatNodeMap.get(node);
     this._database.updateItem(nestedNode!, itemValue);
   }
 
}
