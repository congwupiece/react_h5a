/**
 * 使得requirejs和fis3的资源map结合
 */
( function() {
    var resourcesOriginMap = __RESOURCE_MAP__;
    var resourcesMap = function (){
        var map = { };
        for ( var key in resourcesOriginMap.res ) {
            map[ key ] = resourcesOriginMap.res[ key ].uri
        }
        return map;
    }();
    var load = requirejs.load;
    requirejs.load = function( context, moduleId, url ) {
        url = resourcesMap[ moduleId + '.js' ];
        return load( context, moduleId, url );
    };
}() );