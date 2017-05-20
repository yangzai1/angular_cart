let app = angular.module('mod',[]);
    app.controller('ctrl',($scope) => {
        $scope.cart = [
            {
                id:1000,        // 产品编号
                name:'iphon5s', // 产品名称
                quantity:3,   // 购买数量
                price:4300,     // 产品单价
            },
            {
                id:3000,
                name:"iphon6s",
                quantity:30,
                price:5000,
            },
            {
                id:232,
                name:"imac",
                quantity:3,
                price:20000,
            },
            {
                id:5000,
                name:"ipad",
                quantity:3,
                price:6900,
            }
        ];

        // 计算购物总价
        $scope.totalPrice = function () {
            var total = 0;
            angular.forEach($scope.cart,function (item) {
                total += item.quantity * item.price;
            });
            return total;
        };

        // 总共买数量
        $scope.totalQuantity = function () {
            var total = 0;
            angular.forEach($scope.cart,function (item) {
                total += parseInt(item.quantity);
            });
            return total;
        };

        // 为添加的商品按索引值去找
        var findIndex = function (id) { // 根据ID去找索引
            var index = -1; // 定义一个索引值为-1
            angular.forEach($scope.cart,function (item,key){ // 通过forEach循环$scope.cart,找到item.id,也就是当前的id(key)
                if(item.id === id ){ // 按照索引值删除(把key值赋给当前的index)
                    index = key;
                    return;
                }
            });
            return index;
        };

        // 为某个商品添加购物数量
        $scope.add = function (id) {
            var index = findIndex(id);

            if (index !== -1){
                ++$scope.cart[index].quantity;
            }
        };

        // 为某个商品减少购物数量
        $scope.reduce = function (id) {
            var index = findIndex(id);

            if (index !== -1){
                var item = $scope.cart[index];
                if(item.quantity > 1){
                    --item.quantity;
                }/* 注释的这一块如果你需要提示信息就把注释去掉
                else{
                    var returnKey = confirm('从购物车内删除该产品！');
                    if(returnKey){
                        $scope.remove(id); // 调用下面remove方法删除id
                    }
                }*/
            }
        };

        //移除商品按钮的ng-click事件
        $scope.remove = function (id) {

            var index = findIndex(id);
            if(index !== -1){ // 当找不到-1的时候，通过数组操作删除一位
                $scope.cart.splice(index,1);
            }
        };

        //
        $scope.$watch('cart',function (newValue,oldValue) {

            angular.forEach(newValue,function (item,key) {
               if(item.quantity < 1){

                   var returnKey = confirm('从购物车内删除该产品！');
                   if(returnKey){

                       $scope.remove(item.id); // 调用下面remove方法删除id
                   }else {
                       item.quantity = oldValue[key].quantity; // oldValue是指原始的数据
                   }
                   return;
               }
            });
        },true);

    });
