import { Component, OnInit, Input } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Post, PostComment } from '../../models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class CommentNode {
  constructor(
    public comment: PostComment
  ) {}
}

export class CommentFlatNode {
  constructor(
    public expandable: boolean,
    public comment: PostComment,
    public level: number
  ) {}
}

@Component({
  selector: 'app-comment-tree',
  templateUrl: './comment-tree.component.html',
  styleUrls: ['./comment-tree.component.scss']
})
export class CommentTreeComponent implements OnInit {
  @Input() comments: PostComment[];
  @Input() commentEntities: any;
  @Input() votes;

  dataSource: MatTreeFlatDataSource<CommentNode, CommentFlatNode>;
  treeFlattener: MatTreeFlattener<CommentNode, CommentFlatNode>;
  treeControl: FlatTreeControl<CommentFlatNode>;

  constructor() { }

  ngOnInit() {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getNodeLevel,
      this.isNodeExpendable,
      this.getChildren(this.commentEntities));
    this.treeControl = new FlatTreeControl<CommentFlatNode>(this.getNodeLevel, this.isNodeExpendable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.dataSource.data = this.comments.map(comment => new CommentNode(comment));
    this.treeControl.expandAll();
  }

  private transformer(node: CommentNode, level: number) {
    return new CommentFlatNode(node.comment.childrenIds.length > 0, node.comment, level);
  }

  private getChildren(entities) {
    return (node: CommentNode) => node.comment.childrenIds.map(id => new CommentNode(entities[id]));
  }

  private getNodeLevel(node: CommentFlatNode) {
    return node.comment.parentIds.length;
  }

  private isNodeExpendable(node: CommentFlatNode) {
    return node.expandable;
  }
}
